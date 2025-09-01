import { render, screen } from "@testing-library/react";
import ChatPage from "./ChatPage";

it("renders chat page heading", () => {
    render(<ChatPage />);
    expect(screen.getByText("チャットページ")).toBeInTheDocument();
});
