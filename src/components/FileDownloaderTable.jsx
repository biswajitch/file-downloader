import TableHeader from "./TableComponent/TableHeader/TableHeader.jsx";
import TableBody from "./TableComponent/TableBody/TableBody.jsx";
import DialogModal from "./DialogComponent/DialogModal.jsx";
import FileDownloadList from "./FileDownLoadList.jsx";
import { useState, useEffect } from "react";

const FileDownloaderTable = () => {
  const [fileData, setFileData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch("/file-data.json");
        const data = await result.json();
        setFileData(data);
      } catch (error) {
        setFileData([]);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (fileData.length > 0) {
      const initialChecked = fileData.reduce((acc, file, index) => {
        if (file.status === "available") acc[file.name + index] = false;
        return acc;
      }, {});
      setCheckedItems(initialChecked);
    }
  }, [fileData]);

  const toggleAll = (e) => {
    const checked = e.target.checked;
    const newState = Object.fromEntries(
      Object.keys(checkedItems).map((key) => [key, checked])
    );
    setCheckedItems(newState);
  };

  const toggleOne = (key) => (e) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: e.target.checked,
    }));
  };

  const handleFileDownload = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <TableHeader
        toggleAll={toggleAll}
        checkedItems={checkedItems}
        handleFileDownload={handleFileDownload}
      />
      <TableBody
        fileData={fileData}
        toggleOne={toggleOne}
        checkedItems={checkedItems}
      />
      <DialogModal open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <FileDownloadList fileData={fileData} checkedItems={checkedItems} />
      </DialogModal>
    </>
  );
};

export default FileDownloaderTable;
