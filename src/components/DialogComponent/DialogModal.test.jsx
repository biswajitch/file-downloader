import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DialogModal from "./DialogModal";

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe("DialogModal", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children correctly", () => {
    render(
      <DialogModal open={true} onClose={mockOnClose}>
        <p>Test content</p>
      </DialogModal>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders close button", () => {
    render(
      <DialogModal open={true} onClose={mockOnClose}>
        <p>Content</p>
      </DialogModal>
    );

    expect(screen.getByText(/close/i)).toBeInTheDocument();
  });

  it("shows modal when open is true", () => {
    render(
      <DialogModal open={true} onClose={mockOnClose}>
        <p>Content</p>
      </DialogModal>
    );

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
});
