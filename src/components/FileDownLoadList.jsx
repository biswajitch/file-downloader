import PropTypes from "prop-types";

const listStyle = {
  listStyleType: "none",
  margin: "10px",
};

const pathStyle = {
  marginLeft: "8px",
};

const FileDownloadList = ({ fileData, checkedItems }) => {
  const selectedFiles = fileData.filter((file, index) => {
    const key = file.name + index;
    return checkedItems[key];
  });
  return (
    <>
      <h3 id="selected-files-heading">Selected Files for Download</h3>
      <ul style={listStyle} aria-labelledby="selected-files-heading">
        {selectedFiles.map((file, index) => (
          <li key={index}>
            <span>{file.name}</span>
            <span aria-label={`Path: ${file.path}`} style={pathStyle}>
              {file.path}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

FileDownloadList.propTypes = {
  fileData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  checkedItems: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default FileDownloadList;
