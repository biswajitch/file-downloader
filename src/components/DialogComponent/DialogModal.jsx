import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const closeButtonStyle = {
  padding: "5px",
  border: "1px solid black",
};

export default function DialogModal({ open, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }

    const handleCancel = (e) => {
      e.preventDefault();
      dialog.close();
      onClose?.();
    };

    const handleClose = () => {
      onClose?.();
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("close", handleClose);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      aria-describedby="dialog-desc"
      tabIndex={-1}
      role="dialog"
    >
      <div id="dialog-desc">{children}</div>
      <button
        type="button"
        onClick={() => dialogRef.current.close()}
        style={closeButtonStyle}
        aria-label="Close dialog"
      >
        Close
      </button>
    </dialog>
  );
}

DialogModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
