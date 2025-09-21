import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ChatPage from "../ChatPage";
import { rooms } from "../../../data/rooms";

describe("ChatPage", () => {
    it("renders Chat room with route param", () => {
        render(
            <MemoryRouter initialEntries={["/chat/room1"]}>
                <Routes>
                    <Route path="/chat/:roomId" element={<ChatPage rooms={rooms}/>} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText("Room: room1")).toBeInTheDocument();
    });

    it("adds sent message to list", async () => {
        render(
            <MemoryRouter initialEntries={["/chat/room1"]}>
                <Routes>
                    <Route path="/chat/:roomId" element={<ChatPage rooms={rooms}/>} />
                </Routes>
            </MemoryRouter>
        );

        const input = screen.getByLabelText("message-input");
        await userEvent.type(input, "Hello");
        await userEvent.click(screen.getByRole("button", { name: "送信" }));

        expect(await screen.findByText("Hello")).toBeInTheDocument();
        expect((input as HTMLInputElement).value).toBe("");
    });

    it("switches room when tab clicked", async () => {
        render(
            <MemoryRouter initialEntries={["/chat/room1"]}>
                <Routes>
                    <Route path="/chat/:roomId?" element={<ChatPage rooms={rooms} />} />
                </Routes>
            </MemoryRouter>
        );

        await userEvent.click(screen.getByRole("tab", { name: "ルーム2" }));
        expect(await screen.findByText("Room: room2")).toBeInTheDocument();
    });
});
