import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders with placeholder text", () => {
    render(<SearchBar onSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("calls onSearch when form is submitted with input", async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Search");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "blue parrot");
    await userEvent.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledWith("blue parrot");
  });

  it("does not call onSearch when form is submitted with empty input", async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it("clears input when clear button is clicked", async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Search");
    await userEvent.type(input, "blue parrot");

    expect(input).toHaveValue("blue parrot");

    const clearButton = screen.getByRole("button", { name: /clear search/i });
    await userEvent.click(clearButton);

    expect(input).toHaveValue("");
  });

  it("initializes with currentSearchTerm when provided", () => {
    render(<SearchBar onSearch={vi.fn()} currentSearchTerm="blue parrot" />);

    expect(screen.getByPlaceholderText("Search")).toHaveValue("blue parrot");
  });
});
