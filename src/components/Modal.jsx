import ReactDOM from "react-dom";

const Modal = ({ children, handleCloseModal }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm ">
      {/* Backdrop */}
      <button
        onClick={handleCloseModal}
        className="absolute inset-0 cursor-pointer"
        aria-label="Close Modal"
      />
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md mx-4 p-6 bg-slate-950 border-4 border-orange-100 rounded-3xl shadow-2xl animate-[zoomIn_0.2s_ease-out]">
        {children}
      </div>
    </div>,
    document.getElementById("popup")
  );
};

export default Modal;
