import React, { useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";

const TableHeader = ({ toggleAll, checkedItems, handleFileDownload }) => {
  const checkboxRef = useRef(null);

  const { allChecked, someChecked, isIndeterminate, checkedCount } =
    useMemo(() => {
      const values = Object.values(checkedItems);
      const checkedCount = values.filter(Boolean).length;
      const totalCount = values.length;
      const allChecked = checkedCount === totalCount && totalCount > 0;
      const someChecked = checkedCount > 0;
      return {
        checkedCount,
        allChecked,
        someChecked,
        isIndeterminate: someChecked && !allChecked,
      };
    }, [checkedItems]);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <div className={styles.tableHeader}>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={allChecked}
          ref={checkboxRef}
          onChange={toggleAll}
          aria-checked={isIndeterminate ? "mixed" : allChecked}
          id="select-all-checkbox"
        />
        <label htmlFor="select-all-checkbox">
          {checkedCount === 0 ? "None Selected" : `Selected ${checkedCount}`}
        </label>
      </div>

      <button
        className={styles.fileDownloadButton}
        type="button"
        disabled={!someChecked}
        aria-disabled={!someChecked}
        onClick={handleFileDownload}
        aria-label="Download selected files"
      >
        <span aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 3v9m0 0l-4-4m4 4l4-4M4 15h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>Download Selected</span>
      </button>
    </div>
  );
};

TableHeader.propTypes = {
  toggleAll: PropTypes.func.isRequired,
  checkedItems: PropTypes.objectOf(PropTypes.bool).isRequired,
  handleFileDownload: PropTypes.func.isRequired,
};

export default React.memo(TableHeader);
