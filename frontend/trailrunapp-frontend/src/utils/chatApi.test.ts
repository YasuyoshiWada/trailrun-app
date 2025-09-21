import { postMessage, fetchMessages, type NewChatMessage } from "./chatApi";
import type { ChatMessage } from "../features/chat/types";

describe('chatApi', () =>{
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('posts a message and returns timestamp (number)', async ()=> {
    const mockTimestamp = '2023-01-01T00:00:00Z';
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ timestamp: mockTimestamp}),
    });

    const message: NewChatMessage = { id: '1', user: 'user', text: 'hi'};
    const result = await postMessage('room', message);

    expect(result).toBe(Date.parse(mockTimestamp));
  });

  it('fetches message since given time', async () => {
    const messagesDTO = [
      { id: '1', user: 'u', text: 't', timestamp: '2023-01-01T00:00:00Z' },
    ];
    ( fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => messagesDTO,
    });

    const since = 1000;
    const result = await fetchMessages('room', since);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('since=1000'));
    const expected: ChatMessage[] = [
      { id: '1', user: 'u', text: 't', timestamp: Date.parse('2023-01-01T00:00:00Z') },
    ];
    expect(result).toEqual(expected);
  });

  it('throws and logs on network error', async () => {
    const error = new Error ('network');
    (fetch as jest.Mock).mockRejectedValue(error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(postMessage('room', { id: '1', user: 'u', text: 't'})).rejects.toThrow('network');
    expect(consoleSpy).toHaveBeenCalledWith(error);

    consoleSpy.mockRestore();
  });
});
