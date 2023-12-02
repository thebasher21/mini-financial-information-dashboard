// pagination.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "./index";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const mockSetPagination = jest.fn();

const mockPagination = {
  currentPage: 1,
  totalPages: 10,
  itemsPerPage: 10,
};

const renderPagination = () => {
  waitFor(() => {
    render(
      <Pagination
        pagination={mockPagination}
        setPagination={mockSetPagination}
      />
    );
  });
};

describe("Pagination Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders pagination with correct elements", async () => {
    renderPagination();
    await waitFor(() => {
      expect(screen.getByLabelText("First")).toBeInTheDocument();
      expect(screen.getByLabelText("Previous")).toBeInTheDocument();
      expect(screen.getByLabelText("Next")).toBeInTheDocument();
      expect(screen.getByLabelText("Last")).toBeInTheDocument();
      expect(screen.getByLabelText("Current Page Number")).toBeInTheDocument();
      expect(screen.getByLabelText("Divider")).toBeInTheDocument();
      expect(screen.getByLabelText("Total Pages")).toBeInTheDocument();
      expect(screen.getByLabelText("Items per page")).toBeInTheDocument();
    });
  });

  test("handles go to first page click", async () => {
    renderPagination();
    // act(() => {
    userEvent.click(screen.getByLabelText("Last"));
    userEvent.click(screen.getByLabelText("First"));
    // });
    await waitFor(() => {
      expect(screen.getByLabelText("Current Page Number")).toHaveValue("1");
    });
  });

  test("handles go to last page click", async () => {
    renderPagination();
    userEvent.click(screen.getByLabelText("Last"));
    await waitFor(() => {
      expect(mockSetPagination).toHaveBeenCalled();
    });
  });

  test("handles page number change", async () => {
    renderPagination();
    userEvent.type(screen.getByLabelText("Current Page Number"), "3");
    await waitFor(() => {
      expect(mockSetPagination).toHaveBeenCalled();
    });
  });

  test("handles items per page change", async () => {
    renderPagination();
    userEvent.selectOptions(screen.getByLabelText("Items per page"), "24");
    await waitFor(() => {
      expect(mockSetPagination).toHaveBeenCalled();
    });
  });
});
