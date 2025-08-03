import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TableHeader from "./TableHeader";

describe("TableHeader", () => {
  const mockToggleAll = vi.fn();
  const mockHandleFileDownload = vi.fn();

  const defaultProps = {
    toggleAll: mockToggleAll,
    checkedItems: {},
    handleFileDownload: mockHandleFileDownload,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with no items selected", () => {
    render(<TableHeader {...defaultProps} />);

    expect(screen.getByText("None Selected")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /download selected/i })
    ).toBeDisabled();
  });

  it("renders with some items selected", () => {
    const checkedItems = { file1: true, file2: false, file3: true };
    render(<TableHeader {...defaultProps} checkedItems={checkedItems} />);

    expect(screen.getByText("Selected 2")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /download selected/i })
    ).toBeEnabled();
  });

  it("renders with all items selected", () => {
    const checkedItems = { file1: true, file2: true, file3: true };
    render(<TableHeader {...defaultProps} checkedItems={checkedItems} />);

    expect(screen.getByText("Selected 3")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("sets checkbox to indeterminate when some items are selected", () => {
    const checkedItems = { file1: true, file2: false, file3: true };
    render(<TableHeader {...defaultProps} checkedItems={checkedItems} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.indeterminate).toBe(true);
  });

  it("calls toggleAll when checkbox is clicked", () => {
    render(<TableHeader {...defaultProps} checkedItems={{ file1: false }} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockToggleAll).toHaveBeenCalledTimes(1);
  });

  it("calls handleFileDownload when download button is clicked", () => {
    const checkedItems = { file1: true };
    render(<TableHeader {...defaultProps} checkedItems={checkedItems} />);

    const downloadButton = screen.getByRole("button", {
      name: /download selected/i,
    });
    fireEvent.click(downloadButton);

    expect(mockHandleFileDownload).toHaveBeenCalledTimes(1);
  });
});
