import { useContext, useState } from "react";
import AuthModal from "./AuthModal";
import { AuthContext } from "../utils/AuthContext";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, signout, setIsAuthenticated } =
    useContext(AuthContext);

  return (
    <>
      {isModalOpen && (
        <AuthModal handleCloseModal={() => setIsModalOpen(false)} />
      )}

      <header className="bg-gray-900 text-white shadow sticky top-0 z-11">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3 sm:py-4">
          <h1 className="text-xl sm:text-3xl font-bold text-orange-400 flex gap-2">
            <img
              src="/chai-logo.png"
              className="w-5 sm:w-10 object-contain hover:scale-110 cursor-pointer transition-all duration-200"
              alt=""
            />
            Tracker
          </h1>

          <button
            className="bg-orange-500 hover:bg-orange-600 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base transition-shadow shadow-sm hover:shadow-md cursor-pointer font-medium"
            onClick={async () => {
              if (isAuthenticated === false) {
                setIsModalOpen(true);
              } else {
                console.log("kkkk");
                await signout();
                setIsAuthenticated(false);
              }
            }}
          >
            {isAuthenticated ? "Signout" : "Signin"}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
