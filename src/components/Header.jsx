import { useContext, useState } from "react";
import AuthModal from "./AuthModal";
import { AuthContext } from "../utils/AuthContext";
import ThemeBtn from "./ThemeBtn";
import ChaiArt from "./ChaiArt";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, signout, setIsAuthenticated, globalData } =
    useContext(AuthContext);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {isModalOpen && (
        <AuthModal handleCloseModal={() => setIsModalOpen(false)} />
      )}
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#" aria-label="Chai Tracker home">
            <ChaiArt small />
            <span>
              chai<span className="brand-bottom">tracker</span>
            </span>
            <span className="brand-dot" aria-hidden="true">
              ✳
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#track">Log a cup</a>
            {isAuthenticated &&
              globalData &&
              Object.keys(globalData).length > 0 && (
                <>
                  <a href="#statistics">Statistics</a>
                  <a href="#history">History</a>
                </>
              )}
          </nav>
          <div className="header-actions">
            <ThemeBtn />
            <button
              className="pill pill-light"
              onClick={async () => {
                if (!isAuthenticated) setIsModalOpen(true);
                else {
                  await signout();
                  setIsAuthenticated(false);
                }
              }}
            >
              {isAuthenticated ? "Sign out" : "Sign in"}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
