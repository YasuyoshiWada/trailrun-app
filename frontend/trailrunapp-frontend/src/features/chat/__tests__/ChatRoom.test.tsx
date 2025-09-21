import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatRoom from "../ChatRoom";
import * as chatApi from "../chatApi";

jest.mock("../chatApi");

describe("ChatRoom", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sends message via postMessage and displays it", async () => {
    (chatApi.postMessage as jest.Mock).mockResolvedValue({ id: "1", timestamp: 1});
    render(<ChatRoom roomId="room1" />);
    await userEvent.type(screen.getByLabelText("Message"), "Hello");
    await userEvent.click(screen.getByRole("button", { name: "送信" }));

    await waitFor(() => {
      expect(chatApi.postMessage).toHaveBeenCalledWith("room1", "Hello");
    });
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("fetches messages periodically", async () => {
    jest.useFakeTimers();
    (chatApi.fetchMessages as jest.Mock)
      .mockResolvedValueOnce([
        { id: "1", user: "A", text: "Hi", timestamp: 1 },
      ])
      .mockResolvedValue([]);

    render(<ChatRoom roomId="room1" />);

    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(chatApi.fetchMessages).toHaveBeenCalled();
    });
    expect(screen.getByText("Hi")).toBeInTheDocument();
    jest.useRealTimers();
  });

  it("stops polling when empty messages are returned", async () => {
    jest.useFakeTimers();
    (chatApi.fetchMessages as jest.Mock)
      .mockResolvedValueOnce([
        { id: "1", user: "A", text: "Hi", timestamp: 1 },
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        { id: "2", user: "B", text: "Again", timestamp: 2 },
      ]);

    render(<ChatRoom roomId="room1" />);

    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    await waitFor(() => {
      expect(chatApi.fetchMessages).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    await waitFor(() => {
      expect(chatApi.fetchMessages).toHaveBeenCalledTimes(2);
    });

    await act(async () => {
      jest.advanceTimersByTime(6000);
    });

    expect(chatApi.fetchMessages).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });

  it("clears messages when roomId changes", async () => {
    (chatApi.postMessage as jest.Mock).mockResolvedValue({id: "1", timestamp: 1});
    render(<ChatRoom roomId="room1" />);

    await userEvent.type(screen.getByLabelText("Message"), "Hello");
    await userEvent.click(screen.getByRole("button", { name: "送信" }));
    expect(await screen.findByText("Hello")).toBeInTheDocument();

    render(<ChatRoom roomId="room2" />);

    await waitFor(() => {
      expect(screen.queryByText("Hello")).not.toBeInTheDocument();
    });
  });
});
