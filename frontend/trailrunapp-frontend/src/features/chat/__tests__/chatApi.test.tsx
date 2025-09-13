import { fetchMessages, postMessage } from "../chatApi";

describe("chatApi session", () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "1", timestamp: 1, messages: [] }),
    });
    localStorage.clear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("generates session id and sends it with postMessage", async () => {
    await postMessage("room1", "hello");
    const id = localStorage.getItem("chatSessionId");
    expect(id).toBeTruthy();
    expect((fetch as jest.Mock).mock.calls[0][1].headers["X-Session-Id"]).toBe(id);
  });

  it("reuses existing session id for fetchMessages", async () => {
    localStorage.setItem("chatSessionId", "session-1");
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ messages: [] }),
    });
    await fetchMessages("room1", 0);
    expect((fetch as jest.Mock).mock.calls[0][1].headers["X-Session-Id"]).toBe(
      "session-1"
    );
  });
});
