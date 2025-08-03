import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TableBody from "./TableBody";

describe("TableBody", () => {
  const mockToggleOne = vi.fn();

  const mockFileData = [
    {
      name: "test1.exe",
      device: "Device1",
      path: "\\path\\to\\test1.exe",
      status: "available",
    },
    {
      name: "test2.dll",
      device: "Device2",
      path: "\\path\\to\\test2.dll",
      status: "scheduled",
    },
  ];

  const defaultProps = {
    fileData: mockFileData,
    toggleOne: mockToggleOne,
    checkedItems: { "test1.exe0": false, "test2.dll1": false },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders table headers", () => {
    render(<TableBody {...defaultProps} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Device")).toBeInTheDocument();
    expect(screen.getByText("Path")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders file data correctly", () => {
    render(<TableBody {...defaultProps} />);

    expect(screen.getByText("test1.exe")).toBeInTheDocument();
    expect(screen.getByText("Device1")).toBeInTheDocument();
    expect(screen.getByText("\\path\\to\\test1.exe")).toBeInTheDocument();
    expect(screen.getByText("available")).toBeInTheDocument();
  });

  it("disables checkbox for non-available files", () => {
    render(<TableBody {...defaultProps} />);

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeEnabled(); // available file
    expect(checkboxes[1]).toBeDisabled(); // scheduled file
  });

  it("shows status icon for available files", () => {
    render(<TableBody {...defaultProps} />);

    const statusIcon = screen.getByTitle("Available");
    expect(statusIcon).toHaveClass("status-icon-available");
  });

  it("handles checked state correctly", () => {
    const checkedItems = { "test1.exe0": true };
    render(<TableBody {...defaultProps} checkedItems={checkedItems} />);

    const checkbox = screen.getAllByRole("checkbox")[0];
    expect(checkbox).toBeChecked();
  });
});
