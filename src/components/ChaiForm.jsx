import { useContext, useState } from "react";
import { chaiOptions } from "../utils/index.js";
import AuthModal from "./AuthModal.jsx";
import { db } from "../../firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../utils/AuthContext.jsx";
const ChaiForm = () => {
  const [selectedChai, setSelectedChai] = useState(null);
  const [showChaiTypes, setShowChaiTypes] = useState(false);
  const [chaiCost, setChaiCost] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, globalData, setGlobalData, currentUser } =
    useContext(AuthContext);

  async function handleSubmitChaiForm() {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    if (!selectedChai) {
      return;
    }

    try {
      const newGlobalData = {
        ...(globalData || {}),
      };

      const nowTime = Date.now();
      const timeToSubtract = hour * 60 * 60 * 1000 + min * 60 * 1000;
      const timestamp = nowTime - timeToSubtract;

      const newData = {
        name: selectedChai,
        cost: chaiCost,
      };
      newGlobalData[timestamp] = newData;
      setGlobalData(newGlobalData);

      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        {
          [timestamp]: newData,
        },
        { merge: true }
      );

      setSelectedChai(null);
      setHour(0);
      setMin(0);
      setChaiCost(0);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      {isModalOpen && (
        <AuthModal handleCloseModal={() => setIsModalOpen(false)} />
      )}
      <section className="bg-gray-50 py-8 transition-colors duration-300 dark:bg-gray-900">
        <div
          className="max-w-md mx-4 sm:mx-auto text-gray-800 p-6 sm:p-8 lg:p-10 space-y-6 rounded-xl shadow-lg
                         dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700 md:max-w-[700px]"
        >
          <div className="flex items-center space-x-3 mb-6">
            <i className="fas fa-edit text-3xl text-orange-500 dark:text-orange-400"></i>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
              Start Tracking Today
            </h2>
          </div>

          <div>
            <h4 className="mb-3 text-xl font-medium text-gray-800 dark:text-gray-200">
              Select chai type
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {chaiOptions.slice(0, 5).map((option, optionIndex) => {
                return (
                  <button
                    key={optionIndex}
                    className={
                      "p-4 rounded-lg text-center cursor-pointer flex flex-col justify-center items-center gap-2 transition-all duration-200 hover:scale-105 " +
                      "bg-white border border-gray-200 hover:bg-gray-50 hover:border-orange-500 " +
                      "dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-orange-400 " +
                      (option.name === selectedChai
                        ? "border-orange-500 dark:border-orange-400 border-4 shadow-md"
                        : "")
                    }
                    onClick={() => {
                      setSelectedChai(option.name);
                      setShowChaiTypes(false);
                    }}
                  >
                    <h5 className="font-medium text-lg text-gray-900 dark:text-white">
                      {option.name}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {option.caffeine} mg
                    </p>
                  </button>
                );
              })}
              <button
                className={
                  "p-4 rounded-lg text-center cursor-pointer flex flex-col justify-center items-center gap-2 transition-all duration-200 hover:scale-105 " +
                  "bg-white border border-gray-200 hover:bg-gray-50 hover:border-orange-500 " +
                  "dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-orange-400 " +
                  (showChaiTypes === true
                    ? "border-orange-500 dark:border-orange-400 border-4 shadow-md"
                    : "")
                }
                onClick={() => {
                  setShowChaiTypes(true);
                  setSelectedChai(false);
                }}
              >
                <h5 className="font-medium text-lg text-gray-900 dark:text-white">
                  Others
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">N/A</p>
              </button>
            </div>

            {showChaiTypes && (
              <select
                onChange={(event) => {
                  setSelectedChai(event.target.value);
                }}
                className="mt-4 w-full bg-gray-100 text-gray-900 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none
                           dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-orange-400 dark:[color-scheme:dark]"
              >
                <option value={null}>Select type</option>
                {chaiOptions.map((option, optionIndex) => (
                  <option
                    key={optionIndex}
                    value={option.name}
                    className="dark:bg-gray-800 dark:text-white"
                  >
                    {option.name} ({option.caffeine}mg)
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <h4 className="mb-3 text-xl font-medium text-gray-800 dark:text-gray-200">
              Add the cost (₹)
            </h4>
            <input
              value={chaiCost}
              onChange={(event) => {
                setChaiCost(event.target.value);
              }}
              type="number"
              placeholder="10"
              className="w-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none rounded-lg p-3
                         text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-orange-400"
            />
          </div>

          <div>
            <h4 className="mb-3 text-xl font-medium text-gray-800 dark:text-gray-200">
              Time since consumption
            </h4>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-md mb-2 text-gray-700 dark:text-gray-300">
                  Hours
                </label>
                <select
                  onChange={(event) => {
                    setHour(event.target.value);
                  }}
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500
                             text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-orange-400 dark:[color-scheme:dark]"
                >
                  <option
                    value={null}
                    className="dark:bg-gray-800 dark:text-white"
                  >
                    Select Hours
                  </option>
                  {[
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    17, 18, 19, 20, 21, 22, 23,
                  ].map((hour, hourIndex) => {
                    return (
                      <option
                        key={hourIndex}
                        value={hour}
                        className="dark:bg-gray-800 dark:text-white"
                      >
                        {hour}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-md mb-2 text-gray-700 dark:text-gray-300">
                  Minutes
                </label>
                <select
                  onChange={(event) => {
                    setMin(event.target.value);
                  }}
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500
                             text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-orange-400 dark:[color-scheme:dark]"
                >
                  <option
                    value={null}
                    className="dark:bg-gray-800 dark:text-white"
                  >
                    Select Minutes
                  </option>
                  {[0, 5, 10, 15, 30, 45].map((min, minIndex) => {
                    return (
                      <option
                        key={minIndex}
                        value={min}
                        className="dark:bg-gray-800 dark:text-white"
                      >
                        {min}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmitChaiForm}
            className="w-full h-12 text-xl cursor-pointer bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition-all duration-200 ease-in-out text-white font-semibold py-2 rounded-full shadow-md
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-white
                       dark:bg-orange-600 dark:hover:bg-orange-700 dark:active:bg-orange-800 dark:focus:ring-orange-600 dark:focus:ring-offset-gray-800"
          >
            Add Entry
          </button>
        </div>
      </section>
    </>
  );
};

export default ChaiForm;
