import type { ChatMessage } from "./types";

/**
 * chatApi.ts
 * このモジュールはフロントエンドからチャット用のHTTP APIを呼び出すための
 * 軽量なクライアント関数群を提供します。
 * - 送信: `postMessage`
 * - 取得: `fetchMessages`
 * - 削除: `deleteMessage`
 *
 * セッション識別には `localStorage` に保存した UUID を使用し、
 * 各リクエストのヘッダー `X-Session-Id` に付与します。
 */

/**
 * APIのベースURL。
 * - `process.env.REACT_APP_CHAT_API_BASE_URL` が定義されていればそれを使用。
 * - 未設定の場合はローカル開発用の `http://localhost:4000` にフォールバック。
 *
 * CRA系のフロントエンドではクライアント側から参照する環境変数に `REACT_APP_` 接頭辞が必要です。
 */
const BASE_URL = process.env.REACT_APP_CHAT_API_BASE_URL ?? "http://localhost:4000";

/**
 * セッションIDを `localStorage` に保持する際のキー名。
 * 同一ブラウザ・同一オリジンでタブを跨いでも同じIDが使われます。
 */
const SESSION_STORAGE_KEY = "chatSessionId";

/**
 * セッションIDの取得/生成ユーティリティ。
 * - 既に `localStorage` に保存済みならそれを返します。
 * - 未保存の場合は `crypto.randomUUID()` で新規発行して保存します。
 *
 * これによりAPI側は `X-Session-Id` を用いて、ユーザー識別や
 * 同期制御（重複送信の抑止など）を行えるようになります。
 */
function getSessionId(): string {
  let id = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_STORAGE_KEY, id);
  }
  return id;
}

/**
 * メッセージ送信APIのレスポンス形式。
 * - `id`: サーバー側で採番されたメッセージID
 * - `timestamp`: サーバー記録のUNIXエポックミリ秒
 */
interface PostMessageResponse {
  id: string;
  timestamp: number;
}

/**
 * サーバー側でのメッセージ表現。
 * クライアント側型 `ChatMessage` とはプロパティ名が一部異なる点に注意：
 * - サーバー: 本文プロパティ名が `message`
 * - クライアント: 本文プロパティ名が `text`
 */
interface ServerChatMessage {
  id: string;
  user: string;
  message: string; // サーバー側では text ではなく message プロパティ
  timestamp: number;
}

/**
 * 指定したルームにメッセージを投稿します。
 *
 * @param roomId ルームID（URLパラメータに使用）
 * @param text 送信する本文（クライアント側では `text`、サーバーには `message` として送る）
 * @returns サーバーが採番したメッセージIDとタイムスタンプ
 *
 * リクエスト仕様:
 * - Method: POST
 * - URL: `${BASE_URL}/rooms/${roomId}/messages`
 * - Headers:

*   - `Content-Type: application/json`
 *   - `X-Session-Id: <getSessionId()>`
 * - Body(JSON): `{ message: string }`
 */
export async function postMessage(
  roomId: string,
  text: string
): Promise<PostMessageResponse> {
  try {
    const res = await fetch(`${BASE_URL}/rooms/${roomId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-Id": getSessionId(),
      },
      // サーバー仕様に合わせて本文は `message` キーで送信する
      body: JSON.stringify({ message: text })
    });
    if (!res.ok) {
      throw new Error(`Failed to post message: ${res.status}`);
    }
    return (await res.json()) as PostMessageResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 指定したルームのメッセージを、指定タイムスタンプ以降の増分で取得します。
 *
 * @param roomId ルームID
 * @param lastTimestamp 取得済みの最新タイムスタンプ（UNIXエポックms）。これ以降を取得
 * @returns クライアント側型 `ChatMessage[]`（サーバーの `message` を `text` にマップ）
 *
 * リクエスト仕様:
 * - Method: GET
 * - URL: `${BASE_URL}/rooms/${roomId}/messages?since=${lastTimestamp}`
 * - Headers:
 *   - `X-Session-Id: <getSessionId()>`
 *
 * 備考:
 * - ポーリング/ロングポーリング等の実装箇所から呼ばれる想定。
 */
export async function fetchMessages(
  roomId: string,
  lastTimestamp: number
): Promise<ChatMessage[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/rooms/${roomId}/messages?since=${lastTimestamp}`,
      {
        headers: {
          "X-Session-Id": getSessionId(),
        }
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch messages: ${res.status}`);
    }
    // サーバーの配列レスポンスを受け取り、クライアント側の型へ変換
    const data = (await res.json()) as { messages: ServerChatMessage[] };
    return data.messages.map((m) => ({
      id: m.id,
      user: m.user,
      // サーバーの `message` をクライアントの `text` にマッピング
      text: m.message,
      timestamp: m.timestamp,
    })) ;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 指定したルーム内のメッセージを削除します。
 *
 * @param roomId ルームID
 * @returns なし（成功時は例外を投げない）
 *
 * リクエスト仕様:
 * - Method: DELETE
 * - URL: `${BASE_URL}/rooms/${roomId}/messages`
 * - Headers:
 *   - `X-Session-Id: <getSessionId()>`
 *
 * 注意:
 * - モックサーバー実装では「ルーム内の全メッセージ削除」を想定。
 *   本番APIの仕様次第では影響範囲が異なる可能性があるため、連携先の仕様を確認してください。
 */
export async function deleteMessage(roomId: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/rooms/${roomId}/messages`, {
    method: "DELETE",
    headers: {
      "X-Session-Id": getSessionId(),
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to delete messages: ${res.status}`);
  }
}
