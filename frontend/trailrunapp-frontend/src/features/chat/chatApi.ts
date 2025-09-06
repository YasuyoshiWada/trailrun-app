import { ChatMessage as ChatMessageBase } from "./ChatMessageList";

export interface ChatMessage extends ChatMessageBase {
  timestamp: number;
}

export async function postMessage(
  roomId: string,
  text: string
): Promise<void> {
  TODO: //ここにAPI呼び出しのコードを書く
  return Promise.resolve();
}

export async function fetchMessages(
  roomId: string,
  lastTimestamp: number
): Promise<ChatMessage[]> {
  TODO: //ここにAPI呼び出しのコードを書く
  return Promise.resolve([]);
}
