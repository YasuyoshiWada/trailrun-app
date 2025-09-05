export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp?: string;
}

// CRA uses process.env.REACT_APP_*
const CHAT_ENDPOINT = process.env.REACT_APP_CHAT_ENDPOINT as string;

export async function postMessage(roomId: string,message: ChatMessage): Promise<string> {
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
    return data.timestamp;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchMessages(roomId: string, since: string): Promise<ChatMessage[]> {
  try {
    const url = new URL(`${CHAT_ENDPOINT}/rooms/${encodeURIComponent(roomId)}/messages`);
    if (since) {
      url.searchParams.set('since', since);
    }
    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Failed to fetch messages: ${res.status} ${res.statusText}`);
    }
    const data: ChatMessage[] = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
