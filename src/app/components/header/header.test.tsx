import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import Header from ".";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Header Component", () => {
  const mockedRouter = { push: jest.fn() };
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockedRouter);
  });

  test("renders header correctly", async () => {
    render(<Header />);
    await waitFor(() => {
      expect(screen.getByText("Financial Dashboard")).toBeInTheDocument();
      let logoutButton = screen.getByText("Logout");
      expect(logoutButton).toBeInTheDocument();
      userEvent.click(logoutButton);
      expect(mockedRouter.push).toHaveBeenCalledWith("/pages/login");
    });
  });
});
