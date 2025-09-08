import type { ChatMessage } from "../features/chat/types";
// CRA uses process.env.REACT_APP_*
const CHAT_ENDPOINT = process.env.REACT_APP_CHAT_ENDPOINT as string;

// API boundary types
export type NewChatMessage = Omit<ChatMessage, "timestamp">;
type ChatMessageDTO = Omit<ChatMessage, "timestamp"> & { timestamp: string };

function toDomain(dto: ChatMessageDTO): ChatMessage {
  return { ...dto, timestamp: Date.parse(dto.timestamp) };
}

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
