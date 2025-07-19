import ReactDOM from "react-dom";

const ChaiInfoModal = ({ info, onClose }) => {
  if (!info) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn cursor-pointer"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white w-full max-w-md sm:max-w-lg rounded-3xl p-8 shadow-2xl border border-orange-300 text-gray-800 relative transform hover:scale-[1.02] transition-transform duration-300 m-4 cursor-default
                      dark:bg-gray-800 dark:text-white dark:border-orange-600 dark:shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-orange-500 hover:text-orange-700 text-3xl font-bold cursor-pointer transition-colors duration-200
                     dark:text-orange-400 dark:hover:text-orange-500"
        >
          &times;
        </button>

        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="text-5xl hover:scale-105 cursor-pointer text-orange-500 dark:text-orange-400">
            <i className="fas fa-mug-hot"></i>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-orange-600 text-center dark:text-orange-500">
            {info.name}
          </h3>
          <p className="text-sm text-gray-500 text-center italic dark:text-gray-400">
            Your recent chai moment
          </p>
        </div>

        <ul className="space-y-4 text-base px-1">
          <li className="flex items-center gap-2">
            <span className="text-orange-500 text-xl dark:text-orange-400">
              <i className="fas fa-clock"></i>
            </span>
            <span>
              <strong className="text-gray-700 dark:text-gray-200">
                Time Since:
              </strong>{" "}
              {info.timeSince}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500 text-xl dark:text-orange-400">
              <i className="fas fa-rupee-sign"></i>
            </span>
            <span>
              <strong className="text-gray-700 dark:text-gray-200">
                Cost:
              </strong>{" "}
              ₹{info.cost}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500 text-xl dark:text-orange-400">
              <i className="fas fa-flask"></i>
            </span>
            <span>
              <strong className="text-gray-700 dark:text-gray-200">
                Caffeine Left:
              </strong>{" "}
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
