import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Login from ".";
import { act } from "react-dom/test-utils";
import { authenticate } from "../../services/authService";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../services/authService", () => ({
  authenticate: jest.fn(),
}));

describe("Login Component", () => {
  const mockedRouter = { push: jest.fn() };
  jest.useFakeTimers();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockedRouter);
  });

  test("renders login form correctly", async () => {
    render(<Login />);
    await waitFor(() => {
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
      expect(screen.getByText("LOGIN")).toBeInTheDocument();
    });
  });

  test("loads and redirects on token in sessionStorage", async () => {
    jest
      .spyOn(window.sessionStorage.__proto__, "getItem")
      .mockReturnValueOnce("bHVrZXNreXdhbGtlcl9DM1BPUjJEMg==");
    (authenticate as jest.Mock).mockReturnValueOnce({ isAuthenticated: true });
    render(<Login />);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(mockedRouter.push).toHaveBeenCalledWith("/");
  });

  test("loads and does not redirect on no token in sessionStorage", async () => {
    jest
      .spyOn(window.sessionStorage.__proto__, "getItem")
      .mockReturnValueOnce(null);
    render(<Login />);
    act(() => {
      jest.advanceTimersByTime(500);
    });
  });

  test("handles form submission successfully", async () => {
    (authenticate as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      error: "",
    });
    render(<Login></Login>);
    await waitFor(() => {
      (authenticate as jest.Mock).mockReturnValue({ isAuthenticated: true });
      const usernameInput = screen.getByLabelText("Username");
      const passwordInput = screen.getByLabelText("Password");
      const loginButton = screen.getByText("LOGIN");
      fireEvent.input(usernameInput, { target: { value: "invalidUser" } });
      fireEvent.input(passwordInput, { target: { value: "invalidPassword" } });
      act(() => {
        fireEvent.click(loginButton);
      });
      expect(mockedRouter.push).toHaveBeenCalledWith("/");
    });
  });

  test("handles form submission failure", async () => {
    (authenticate as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      error: "Invalid credentials",
    });
    render(<Login />);
    await waitFor(() => {
      const usernameInput = screen.getByLabelText("Username");
      const passwordInput = screen.getByLabelText("Password");
      const loginButton = screen.getByText("LOGIN");
      fireEvent.input(usernameInput, { target: { value: "invalidUser" } });
      fireEvent.input(passwordInput, { target: { value: "invalidPassword" } });
      act(() => {
        fireEvent.click(loginButton);
      });
    });
    await waitFor(() => {
      expect(screen.getByTestId("loginErrorMessage")).toBeInTheDocument();
    });
  });
});
