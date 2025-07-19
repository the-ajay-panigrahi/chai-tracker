import { useContext, useState } from "react";
import AuthModal from "./AuthModal";
import { AuthContext } from "../utils/AuthContext";
import ThemeBtn from "./ThemeBtn";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, signout, setIsAuthenticated } =
    useContext(AuthContext);

  return (
    <>
      {isModalOpen && (
        <AuthModal handleCloseModal={() => setIsModalOpen(false)} />
      )}

      <header className="bg-white text-gray-800 shadow sticky top-0 z-11 transition-colors duration-300 dark:bg-gray-900 dark:text-white">
        <div className="max-w-screen-md mx-auto flex justify-between items-center px-4 py-3 sm:py-4 md:max-w-[700px]">
          <h1 className="text-xl sm:text-3xl font-bold text-orange-500 flex items-center gap-2 transition-colors duration-300 dark:text-orange-400">
            <img
              src="/chai-logo.png"
              className="w-5 sm:w-10 object-contain hover:scale-110 cursor-pointer transition-transform duration-200 ease-in-out"
              alt=""
            />
            Tracker
          </h1>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeBtn />

            <button
              className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base transition-all duration-200 ease-in-out shadow-sm hover:shadow-md cursor-pointer font-medium text-white dark:bg-orange-600 dark:hover:bg-orange-700 dark:active:bg-orange-800 dark:focus:ring-orange-600"
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
        </div>
      </header>
    </>
  );
};

export default Header;
