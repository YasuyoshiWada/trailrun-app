import type { ChatMessage } from "./types";

export async function postMessage(
  roomId: string,
  text: string
): Promise<void> {
  // Implement API call here if needed. Tests mock this module.
  return Promise.resolve();
}

export async function fetchMessages(
  roomId: string,
  lastTimestamp: number
): Promise<ChatMessage[]> {
  // Implement API call here if needed. Tests mock this module.
  return Promise.resolve([]);
}
