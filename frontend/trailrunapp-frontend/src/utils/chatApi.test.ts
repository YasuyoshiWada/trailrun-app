import { postMessage, fetchMessages, ChatMessage } from "./chatApi";

describe('chatApi', () =>{
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('posts a message and returns timestamp', async ()=> {
    const mockTimestamp = '2023-01-01T00:00:00Z';
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ timestamp: mockTimestamp}),
    });

    const message:  ChatMessage = { id: '1', user: 'user', text: 'hi'};
    const result = await postMessage('room', message);

    expect(result).toBe(mockTimestamp);
  });

  it('fetches message since given time', async () => {
    const messages: ChatMessage[] = [{ id: '1', user: 'u', text: 't', timestamp: 's' }];
    ( fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => messages,
    });

    const result = await fetchMessages('room', 's0');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('since=s0'));
    expect(result).toEqual(messages);
  });

  it('throws and logs on network error', async () => {
    const error = new Error ('network');
    (fetch as jest.Mock).mockRejectedValue(error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(postMessage('room', { id: '1', user: 'u', text: 't'})).rejects.toThrow('network');
    expect('consoleSpy').toHaveBeenCalledWith(error);

    consoleSpy.mockRestore();
  });
});
