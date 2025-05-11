import ReactDOM from "react-dom";

const ChaiInfoModal = ({ info, onClose }) => {
  if (!info) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-200">
      <div className="bg-white w-full max-w-md sm:max-w-lg rounded-2xl p-8 shadow-2xl border border-orange-300 text-slate-800 relative transform hover:scale-[1.02] transition-transform duration-300 m-5">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-orange-500 hover:text-orange-700 text-3xl font-bold cursor-pointer transition-colors duration-200"
        >
          ×
        </button>
        <h3 className="text-2xl font-bold text-orange-600 mb-5 text-center">
          {info.name}
        </h3>
        <ul className="space-y-3 text-base px-1">
          <li>
            <strong className="text-slate-700">Time Since Consumption:</strong>{" "}
            {info.timeSince}
          </li>
          <li>
            <strong className="text-slate-700">Cost:</strong> ₹{info.cost}
          </li>
          <li>
            <strong className="text-slate-700">Caffeine Left:</strong>{" "}
            {info.remaining}mg / {info.original}mg
          </li>
        </ul>
      </div>
    </div>,
    document.getElementById("popup")
  );
};

export default ChaiInfoModal;
