import type { ChatMessage } from "./types";

const BASE_URL = "http://localhost:4000";

export async function postMessage(
  roomId: string,
  text: string
): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/rooms/${roomId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text }),//messageプロパティにtextをセットkey:message,value:text
    });
    if (!res.ok) {
      throw new Error(`Failed to post message: ${res.status}`);
    }
    await res.json();
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
    const data = (await res.json()) as {messages: ChatMessage[]};
    return data.messages;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
