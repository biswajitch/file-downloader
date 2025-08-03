import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FileDownloadList from "./FileDownLoadList";

describe("FileDownloadList", () => {
  const mockFileData = [
    { name: "file1.exe", path: "\\path\\to\\file1.exe" },
    { name: "file2.exe", path: "\\path\\to\\file2.exe" },
    { name: "file3.exe", path: "\\path\\to\\file3.exe" },
  ];

  it("renders title correctly", () => {
    render(<FileDownloadList fileData={mockFileData} checkedItems={{}} />);

    expect(screen.getByText("Selected Files for Download")).toBeInTheDocument();
  });

  it("shows only selected files", () => {
    const checkedItems = {
      "file1.exe0": true,
      "file2.exe1": false,
      "file3.exe2": true,
    };
    render(
      <FileDownloadList fileData={mockFileData} checkedItems={checkedItems} />
    );

    expect(screen.getByText("file1.exe")).toBeInTheDocument();
    expect(screen.getByText("file3.exe")).toBeInTheDocument();
    expect(screen.queryByText("file2.exe")).not.toBeInTheDocument();
  });

  it("displays file paths correctly", () => {
    const checkedItems = { "file1.exe0": true };
    render(
      <FileDownloadList fileData={mockFileData} checkedItems={checkedItems} />
    );

    expect(screen.getByText("\\path\\to\\file1.exe")).toBeInTheDocument();
  });

  it("renders empty list when no items are selected", () => {
    render(<FileDownloadList fileData={mockFileData} checkedItems={{}} />);

    const list = screen.getByRole("list");
    expect(list).toBeEmptyDOMElement();
  });
});
