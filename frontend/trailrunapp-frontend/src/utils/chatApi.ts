import type { ChatMessage } from "../features/chat/types";

// このファイルは「ユーティリティ用の Chat API クライアント」です。
// 注意: features/chat/chatApi.ts という別実装もあり、エンドポイント仕様が異なります。
// こちらは環境変数 REACT_APP_CHAT_ENDPOINT を基準に URL を組み立てます。

// CRA(react-scripts) の環境変数の読み取り。
// - .env / .env.development / .env.production などに
//   REACT_APP_CHAT_ENDPOINT=http://localhost:4000 のように定義します。
// - ビルド時に値がコードへ埋め込まれます（実行時に動的には変わりません）。
// - as string で型を主張していますが、未設定だと実行時は undefined になり得ます。
const CHAT_ENDPOINT = process.env.REACT_APP_CHAT_ENDPOINT as string;

// ドメインモデル（画面側で使う型）: timestamp は number(ms)
// API 入出力では異なる表現になることがあるため DTO と相互変換します。
export type NewChatMessage = Omit<ChatMessage, "timestamp">; // 送信用（timestamp はサーバが付与想定）
type ChatMessageDTO = Omit<ChatMessage, "timestamp"> & { timestamp: string }; // サーバからは ISO 文字列想定

// DTO(サーバ表現) -> ドメイン表現への変換
function toDomain(dto: ChatMessageDTO): ChatMessage {
  return { ...dto, timestamp: Date.parse(dto.timestamp) };
}

// POST /rooms/:roomId/message
// - 送信ボディ: { id, user, text }（timestamp は送らない）
// - 返り値: { timestamp: string }（ISO 文字列）→ number(ms) を返す
// 注意: server/mockChatServer.ts は /messages（複数形）かつ timestamp:number を返すため非互換です。
export async function postMessage(
  roomId: string,
  message: NewChatMessage
): Promise<number> {
  try {
    const res = await fetch(`${CHAT_ENDPOINT}/rooms/${encodeURIComponent(roomId)}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
    if (!res.ok) {
      throw new Error(`Failed to post message: ${res.status} ${res.statusText}`);
    }
    const data: { timestamp: string } = await res.json();
    return Date.parse(data.timestamp);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// GET /rooms/:roomId/messages?since=<ms>
// - 返り値: ChatMessageDTO[]（timestamp は ISO 文字列）→ ChatMessage[] に変換
// 注意: server/mockChatServer.ts は { messages: Array<{ message, timestamp:number }> } を返すため非互換です。
export async function fetchMessages(roomId: string, since: number): Promise<ChatMessage[]> {
  try {
    const url = new URL(`${CHAT_ENDPOINT}/rooms/${encodeURIComponent(roomId)}/messages`);
    if (since) {
      url.searchParams.set('since', String(since));
    }
    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Failed to fetch messages: ${res.status} ${res.statusText}`);
    }
    const data: ChatMessageDTO[] = await res.json();
    return data.map(toDomain);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
