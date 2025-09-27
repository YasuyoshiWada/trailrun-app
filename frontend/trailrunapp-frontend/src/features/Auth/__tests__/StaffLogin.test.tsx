import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StaffLogin from "../StaffLogin";
import { useAuth } from "../AuthContext";
import useResponsive from "../../../hooks/useResponsive";
import { useLocation, useNavigate } from "react-router-dom";

jest.mock("../../../hooks/useResponsive");
jest.mock("../AuthContext");

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
  };
});

const loginMock = jest.fn();
const navigateMock = jest.fn();

describe("StaffLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useResponsive as jest.Mock).mockReturnValue({
      isSmallMobile: false,
      isMobile: false,
    });
    (useAuth as jest.Mock).mockReturnValue({ login: loginMock });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useLocation as jest.Mock).mockReturnValue({ state: undefined });
  });

  it("shows an error and keeps focus on the form when required fields are empty", async () => {
    const user = userEvent;
    render(<StaffLogin />);

    await user.click(screen.getByRole("button", { name: "スタッフログイン" }));

    expect(loginMock).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("名前と電話番号を入力してください。");
  });

  it("trims input values and proceeds with login and navigation when valid", async () => {
    const user = userEvent;
    render(<StaffLogin />);

    await user.type(screen.getByLabelText("名前"), "  山田 太郎  ");
    await user.type(screen.getByLabelText("電話番号"), " 090-1234-5678  ");
    await user.type(screen.getByLabelText("所属"), "  受付チーム  ");
    await user.click(screen.getByRole("button", { name: "スタッフログイン" }));

    expect(loginMock).toHaveBeenCalledWith("staff", {
      name: "山田 太郎",
      telnumber: "090-1234-5678",
      group: "受付チーム",
    });
    expect(navigateMock).toHaveBeenCalledWith("/", { replace: true, state: undefined });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
