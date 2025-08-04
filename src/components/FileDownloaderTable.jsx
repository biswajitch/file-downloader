import TableHeader from "./TableComponent/TableHeader/TableHeader.jsx";
import TableBody from "./TableComponent/TableBody/TableBody.jsx";
import DialogModal from "./DialogComponent/DialogModal.jsx";
import FileDownloadList from "./FileDownLoadList.jsx";
import { useState, useEffect, useCallback } from "react";

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
  {
    /* 
    I have not mutated the fileData to have a unique id for each file. 
    I have used the index and file name to create a unique key for each file. 
    In future refactoring, I would prefer to use either a unique id generation utility 
    or the file path as a unique identifier.
  */
  }
  useEffect(() => {
    if (fileData.length > 0) {
      const initialChecked = fileData.reduce((acc, file, index) => {
        if (file.status === "available") acc[file.name + index] = false;
        return acc;
      }, {});
      setCheckedItems(initialChecked);
    }
  }, [fileData]);

  const toggleAll = useCallback((e) => {
    const checked = e.target.checked;
    setCheckedItems((prev) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, checked]))
    );
  }, []);

  {
    /* 
    the toogleOne function needs to be upated if the dataset is large, either using
    a virtualized list or a shared handler. To minimize the number of closures created
    */
  }
  const toggleOne = useCallback(
    (key) => (e) => {
      const value = e.target.checked;
      setCheckedItems((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

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
