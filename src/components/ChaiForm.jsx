import { useState } from "react";
import { chaiOptions } from "../utils/index.js";
const ChaiForm = () => {
  const [selectedChai, setSelectedChai] = useState(null);
  const [showChaiTypes, setShowChaiTypes] = useState(false);
  const [chaiCost, setChaiCost] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);

  const handleSubmitChaiForm = () => {
    console.log(selectedChai, chaiCost, hour, min);
  };

  return (
    <section className="bg-slate-800">
      <div className="max-w-6xl mx-auto text-white p-8  space-y-6">
        <div className="flex items-center space-x-2 mb-6 mt-2">
          <span className="text-2xl text-orange-400">✏️</span>
          <h2 className="text-3xl font-semibold">Start Tracking Today</h2>
        </div>

        <div>
          <h4 className="mb-2 text-xl font-medium">Select chai type</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {chaiOptions.slice(0, 5).map((option, optionIndex) => {
              return (
                <button
                  key={optionIndex}
                  className={
                    "p-3 rounded-lg bg-gray-700 border-gray-600 text-left cursor-pointer flex flex-col justify-center items-center gap-2 transition-all duration-200 hover:scale-105 hover:border-orange-400 border-2 " +
                    (option.name === selectedChai
                      ? "border-orange-400 border-4"
                      : "")
                  }
                  onClick={() => {
                    setSelectedChai(option.name);
                    setShowChaiTypes(false);
                  }}
                >
                  <h5 className="font-medium text-lg">{option.name}</h5>
                  <p className="text-sm text-gray-300">{option.caffeine} mg</p>
                </button>
              );
            })}
            <button
              className={
                "p-3 rounded-lg bg-gray-700 border-gray-600 text-left cursor-pointer flex flex-col justify-center items-center gap-2 transition-all duration-200 hover:scale-105 hover:border-orange-400 border-2 " +
                (showChaiTypes === true ? "border-orange-400 border-4" : "")
              }
              onClick={() => {
                setShowChaiTypes(true);
                setSelectedChai(false);
              }}
            >
              <h5 className="font-medium text-lg">Others</h5>
              <p className="text-sm text-gray-300">N/A</p>
            </button>
          </div>

          {showChaiTypes && (
            <select
              onChange={(event) => {
                setSelectedChai(event.target.value);
              }}
              className="mt-3 w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none"
            >
              <option value={null}>Select type</option>
              {chaiOptions.map((option, optionIndex) => (
                <option key={optionIndex} value={option.name}>
                  {option.name} ({option.caffeine}mg)
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <h4 className="mb-2 text-xl font-medium">Add the cost (₹)</h4>
          <input
            value={chaiCost}
            onChange={(event) => {
              setChaiCost(event.target.value);
            }}
            type="number"
            placeholder="10"
            className="w-full bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none rounded-lg p-2"
          />
        </div>

        <div>
          <h4 className="mb-2 text-xl font-medium">Time since consumption</h4>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-md mb-1">Hours</label>
              <select
                onChange={(event) => {
                  setHour(event.target.value);
                }}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2"
              >
                {[
                  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                  18, 19, 20, 21, 22, 23,
                ].map((hour, hourIndex) => {
                  return (
                    <option key={hourIndex} value={hour}>
                      {hour}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-md mb-1">Minutes</label>
              <select
                onChange={(event) => {
                  setMin(event.target.value);
                }}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2"
              >
                {[0, 5, 10, 15, 30, 45].map((min, minIndex) => {
                  return (
                    <option key={minIndex} value={min}>
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
          className="w-full h-12 text-xl cursor-pointer bg-orange-500 hover:bg-orange-600 transition text-white font-semibold py-2 rounded-full shadow"
        >
          Add Entry
        </button>
      </div>
    </section>
  );
};

export default ChaiForm;
