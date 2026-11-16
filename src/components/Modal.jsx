import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
const Modal = ({ titleId, onClose, children }) => {
  const dialogRef = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = dialogRef.current;
    dialog.showModal();
    const handleClick = (event) => {
      if (event.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }
    };
    dialog.addEventListener("click", handleClick);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.removeEventListener("click", handleClick);
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [onClose]);
  return createPortal(
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <button
        className="close-button"
        aria-label="Close dialog"
        onClick={onClose}
      >
        ×
      </button>
      {children}
    </dialog>,
    document.getElementById("popup"),
  );
};
export default Modal;
