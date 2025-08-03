import "./index.css";
import PropTypes from "prop-types";

const tableRowClass = (file, index, checkedItems) =>
  `table-row
        ${checkedItems[file.name + index] ? "checked" : ""}
        ${file.status !== "available" ? "disabled" : ""}`;

const TableBody = ({ fileData, toggleOne, checkedItems }) => {
  return (
    <ul className="table-body-list" role="table" aria-label="File list">
      <li className="table-column" role="row">
        <span
          className="file-checkbox"
          role="columnheader"
          aria-label="Select"
        ></span>
        <span className="file-name" role="columnheader">
          Name
        </span>
        <span className="file-device" role="columnheader">
          Device
        </span>
        <span className="file-path" role="columnheader">
          Path
        </span>
        <span className="file-status" role="columnheader">
          Status
        </span>
      </li>

      {fileData.length === 0 && (
        <li className="no-data" role="row">
          <span>No files available</span>
        </li>
      )}

      {fileData.map((file, index) => (
        <li
          key={index}
          className={tableRowClass(file, index, checkedItems)}
          role="row"
        >
          <input
            type="checkbox"
            className="file-checkbox"
            disabled={file.status !== "available"}
            checked={checkedItems[file.name + index] ?? false}
            onChange={toggleOne(file.name + index)}
            aria-label={`Select file ${file.name}`}
            aria-checked={checkedItems[file.name + index] ?? false}
          />
          <span className="file-name" role="cell">
            {file.name}
          </span>
          <span className="file-device" role="cell">
            {file.device}
          </span>
          <span className="file-path" role="cell">
            {file.path}
          </span>
          <span className="file-status" role="cell">
            {file.status === "available" && (
              <span
                className="status-icon-available"
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

export default TableBody;
