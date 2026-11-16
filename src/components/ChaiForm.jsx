import { useContext, useState } from "react";
import { chaiOptions } from "../utils/index.js";
import AuthModal from "./AuthModal.jsx";
import { db } from "../../firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../utils/AuthContext.jsx";
import { Spark } from "./ChaiArt";
const ChaiForm = () => {
  const [selectedChai, setSelectedChai] = useState(null);
  const [showChaiTypes, setShowChaiTypes] = useState(false);
  const [chaiCost, setChaiCost] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const { isAuthenticated, globalData, setGlobalData, currentUser } =
    useContext(AuthContext);
  async function handleSubmitChaiForm(event) {
    event.preventDefault();
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }
    if (!selectedChai) {
      setMessage("Select a chai type first.");
      return;
    }
    setIsSaving(true);
    setMessage("");
    try {
      const newGlobalData = { ...(globalData || {}) };
      const nowTime = Date.now();
      const timeToSubtract = hour * 60 * 60 * 1000 + min * 60 * 1000;
      const timestamp = nowTime - timeToSubtract;
      const newData = { name: selectedChai, cost: chaiCost };
      newGlobalData[timestamp] = newData;
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, { [timestamp]: newData }, { merge: true });
      setGlobalData(newGlobalData);
      setSelectedChai(null);
      setHour(0);
      setMin(0);
      setChaiCost(0);
      setShowChaiTypes(false);
      setMessage("One more cup, counted. Chai saved!");
    } catch {
      setMessage("Your chai couldn’t be saved. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }
  return (
    <>
      {isModalOpen && (
        <AuthModal handleCloseModal={() => setIsModalOpen(false)} />
      )}
      <section id="track" className="tracking section-space">
        <div className="shell tracking-layout">
          <div className="tracking-intro">
            <span className="eyebrow">01 / THE DAILY RITUAL</span>
            <h2>
              Good chai.
              <br />
              Great records.
            </h2>
            <p>
              Masala, kadak, or something else?
              <br />
              Make a little note of your latest cup.
            </p>
            <aside className="caffeine-note">
              <Spark />
              <span className="eyebrow">A LITTLE CHAI KNOWLEDGE</span>
              <h3>
                Half now.
                <br />
                Half in 5 hours.
              </h3>
              <p>
                Caffeine’s half-life is about 5 hours. Sip 100mg now, and about
                50mg is still in your system 5 hours later.
              </p>
            </aside>
          </div>
          <form className="chai-form" onSubmit={handleSubmitChaiForm}>
            <div className="form-heading">
              <h3>Log a cup</h3>
              <span className="small-label">FRESHLY BREWED?</span>
            </div>
            <fieldset>
              <legend>
                <span className="step">1</span> Select chai type
              </legend>
              <div className="chai-options">
                {chaiOptions.slice(0, 5).map((option, index) => (
                  <button
                    type="button"
                    key={option.name}
                    className={`chai-option ${selectedChai === option.name ? "selected" : ""}`}
                    aria-pressed={selectedChai === option.name}
                    onClick={() => {
                      setSelectedChai(option.name);
                      setShowChaiTypes(false);
                      setMessage("");
                    }}
                  >
                    <span className="option-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <strong>{option.name}</strong>
                    <span>{option.caffeine} mg caffeine</span>
                    <span className="selection-mark" aria-hidden="true">
                      {selectedChai === option.name ? "✓" : "+"}
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  className={`chai-option other-option ${showChaiTypes ? "selected" : ""}`}
                  aria-expanded={showChaiTypes}
                  aria-controls="other-types"
                  onClick={() => {
                    setShowChaiTypes(true);
                    setSelectedChai(false);
                  }}
                >
                  <span className="option-number" aria-hidden="true">
                    06
                  </span>
                  <strong>Others</strong>
                  <span>Explore all types</span>
                  <span className="selection-mark" aria-hidden="true">
                    ↗
                  </span>
                </button>
              </div>
              {showChaiTypes && (
                <div className="other-types" id="other-types">
                  <label htmlFor="chai-type">Choose your chai</label>
                  <select
                    id="chai-type"
                    value={selectedChai || ""}
                    onChange={(event) => setSelectedChai(event.target.value)}
                  >
                    <option value="">Select type</option>
                    {chaiOptions.map((option) => (
                      <option key={option.name} value={option.name}>
                        {option.name} ({option.caffeine}mg)
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </fieldset>
            <div className="form-bottom">
              <div>
                <label className="field-title" htmlFor="chai-cost">
                  <span className="step">2</span> Add the cost
                </label>
                <div className="money-input">
                  <span aria-hidden="true">₹</span>
                  <input
                    id="chai-cost"
                    aria-label="Cost in rupees"
                    type="number"
                    step="any"
                    value={chaiCost}
                    onChange={(event) => setChaiCost(event.target.value)}
                  />
                </div>
              </div>
              <fieldset>
                <legend>
                  <span className="step">3</span> How long ago?
                </legend>
                <div className="time-inputs">
                  <div>
                    <label htmlFor="chai-hours">Hours</label>
                    <select
                      id="chai-hours"
                      value={hour}
                      onChange={(event) => setHour(event.target.value)}
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="chai-minutes">Minutes</label>
                    <select
                      id="chai-minutes"
                      value={min}
                      onChange={(event) => setMin(event.target.value)}
                    >
                      {[0, 5, 10, 15, 30, 45].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </fieldset>
            </div>
            <button className="pill pill-dark submit-chai" disabled={isSaving}>
              {isSaving ? "Saving your chai…" : "Add entry"}
              <span className="pill-arrow" aria-hidden="true">
                <svg viewBox="0 0 16 16" focusable="false">
                  <path d="M4 12 12 4M5 4h7v7" />
                </svg>
              </span>
            </button>
            <p className="form-message" role="status">
              {message ||
                (!isAuthenticated
                  ? "Sign in to save your cups and keep them with you."
                  : "A little ritual. A lasting record.")}
            </p>
          </form>
        </div>
      </section>
    </>
  );
};
export default ChaiForm;
