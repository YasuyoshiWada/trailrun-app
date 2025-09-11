import type { ChatMessage } from "./types";

//環境変数経由でAPIエンドポイントを上書きできるようにし、本番サーバーへの切り替えには環境変数の変更のみを必要とするようにする。
const BASE_URL =
  process.env.REACT_APP_CHAT_API_BASE_URL ?? "http://localhost:4000";

interface PostMessageResponse {
  id: string;
  timestamp: number;
}

interface ServerChatMessage {
  id: string;
  user: string;
  message: string;//サーバー側ではtextではなくmessageプロパティとしている
  timestamp: number;
}

export async function postMessage(
  roomId: string,
  text: string
): Promise<PostMessageResponse> {
  try {
    const res = await fetch(`${BASE_URL}/rooms/${roomId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })//messageプロパティにtextをセットkey:message,value:text
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

export async function fetchMessages(
  roomId: string,
  lastTimestamp: number
): Promise<ChatMessage[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/rooms/${roomId}/messages?since=${lastTimestamp}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch messages: ${res.status}`);
    }
    const data = (await res.json()) as {messages: ServerChatMessage[] };
    return data.messages.map((m) => ({
      id: m.id,
      user: m.user,
      text: m.message,//サーバー側ではmessageプロパティとしているのでtextにマッピング
      timestamp: m.timestamp,
    })) ;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
