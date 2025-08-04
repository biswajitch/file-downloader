import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";

const tableRowClass = (file, index, checkedItems) =>
  `${styles.tableRow}
        ${checkedItems[file.name + index] ? styles.checked : ""}
        ${file.status !== "available" ? styles.disabled : ""}`;

const TableBody = ({ fileData, toggleOne, checkedItems }) => {
  return (
    <ul className={styles.tableBodyList} role="table" aria-label="File list">
      <li className={styles.tableColumn} role="row">
        <span
          className={styles.fileCheckbox}
          role="columnheader"
          aria-label="Select"
        ></span>
        <span className={styles.fileName} role="columnheader">
          Name
        </span>
        <span className={styles.fileDevice} role="columnheader">
          Device
        </span>
        <span className={styles.filePath} role="columnheader">
          Path
        </span>
        <span className={styles.fileStatus} role="columnheader">
          Status
        </span>
      </li>
      {fileData.length === 0 && (
        <li className={styles.noData} role="row">
          <span>No files available</span>
        </li>
      )}
      {/*
        If we have a large number of file rows, we can use a virtualized list here.
        For now, we will render all rows.
        This is a simple implementation — in a real-world scenario,
        we might want to paginate or virtualize this list.
      */}
      {fileData.map((file, index) => (
        <li
          key={file.name + index}
          className={tableRowClass(file, index, checkedItems)}
          role="row"
        >
          <input
            type="checkbox"
            className={styles.fileCheckbox}
            disabled={file.status !== "available"}
            checked={checkedItems[file.name + index] ?? false}
            onChange={toggleOne(file.name + index)}
            aria-label={`Select file ${file.name}`}
            aria-checked={checkedItems[file.name + index] ?? false}
          />
          <span className={styles.fileName} role="cell">
            {file.name}
          </span>
          <span className={styles.fileDevice} role="cell">
            {file.device}
          </span>
          <span className={styles.filePath} role="cell">
            {file.path}
          </span>
          <span className={styles.fileStatus} role="cell">
            {file.status === "available" && (
              <span
                className={styles.statusIconAvailable}
                title="Available"
                aria-label="Available"
              ></span>
            )}
            {file.status}
          </span>
        </li>
      ))}
    </ul>
  );
};

TableBody.propTypes = {
  fileData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      device: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleOne: PropTypes.func.isRequired,
  checkedItems: PropTypes.object.isRequired,
};

export default React.memo(TableBody);
