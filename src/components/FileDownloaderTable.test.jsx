import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FileDownloaderTable from "./FileDownloaderTable";

global.fetch = vi.fn();

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

describe("FileDownloaderTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockFileData,
    });
  });

  it("fetches and displays file data", async () => {
    render(<FileDownloaderTable />);

    await waitFor(() => {
      expect(screen.getByText("test1.exe")).toBeInTheDocument();
      expect(screen.getByText("test2.dll")).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith("/file-data.json");
  });

  it("handles fetch error gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    fetch.mockRejectedValue(new Error("Fetch failed"));

    render(<FileDownloaderTable />);

    await waitFor(() => {
      expect(screen.getByText("No files available")).toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching data:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });

  it("initializes checked items for available files only", async () => {
    render(<FileDownloaderTable />);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes).toHaveLength(3); // header + 2 files, but only available ones are enabled
    });
  });

  it("toggles all checkboxes when header checkbox is clicked", async () => {
    render(<FileDownloaderTable />);

    await waitFor(() => {
      expect(screen.getByText("test1.exe")).toBeInTheDocument();
    });

    const headerCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(headerCheckbox);

    expect(screen.getByText("Selected 1")).toBeInTheDocument();
  });
});
