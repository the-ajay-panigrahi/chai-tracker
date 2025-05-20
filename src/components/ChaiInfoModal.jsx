import ReactDOM from "react-dom";

const ChaiInfoModal = ({ info, onClose }) => {
  if (!info) return null;

  const handleBackdropClick = (e) => {
    /*
      Close only if the click is on the backdrop (not inside the modal)

      e.target
        - The exact element that was clicked (could be inside the modal box)

      e.currentTarget
        - The element where the click handler is attached (the backdrop)

      If both are same → user clicked on the backdrop, so close the modal
    */
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn cursor-pointer"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-md sm:max-w-lg rounded-3xl p-8 shadow-2xl border border-orange-300 text-slate-800 relative transform hover:scale-[1.02] transition-transform duration-300 m-4 cursor-default">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-orange-500 hover:text-orange-700 text-3xl font-bold cursor-pointer transition-colors duration-200"
        >
          ×
        </button>

        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="text-5xl hover:scale-105 cursor-pointer">☕</div>
          <h3 className="text-2xl sm:text-3xl font-bold text-orange-600 text-center">
            {info.name}
          </h3>
          <p className="text-sm text-slate-500 text-center italic">
            Your recent chai moment
          </p>
        </div>

        <ul className="space-y-4 text-base px-1">
          <li className="flex items-center gap-2">
            <span className="text-orange-500 text-xl">🕒</span>
            <span>
              <strong className="text-slate-700">Time Since:</strong>{" "}
              {info.timeSince}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500 text-xl">💸</span>
            <span>
              <strong className="text-slate-700">Cost:</strong> ₹{info.cost}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500 text-xl">💊</span>
            <span>
              <strong className="text-slate-700">Caffeine Left:</strong>{" "}
              {info.remaining}mg / {info.original}mg
            </span>
          </li>
        </ul>
      </div>
    </div>,
    document.getElementById("popup")
  );
};

export default ChaiInfoModal;
