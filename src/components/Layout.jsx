import { useState } from "react";
import Authentication from "./Authentication";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";

const Layout = (props) => {
  const { children } = props;
  const { globalUser, logout } = useAuth();

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal
          handleCloseModal={() => {
            setShowModal(false);
          }}
        >
          <Authentication
            handleCloseModal={() => {
              setShowModal(false);
            }}
          />
        </Modal>
      )}
      <div className="relative">
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
            {globalUser ? (
              <button
                onClick={() => {
                  logout();
                }}
                className="bg-orange-500 hover:bg-orange-600 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base transition-shadow shadow-sm hover:shadow-md cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="bg-orange-500 hover:bg-orange-600 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base transition-shadow shadow-sm hover:shadow-md cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-900 text-gray-400">
          <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-center">
            <span className="text-sm sm:text-base">
              &copy; {new Date().getFullYear()} Chai Tracker
            </span>
            <div className="flex gap-4 mt-3 sm:mt-0 text-sm sm:text-base">
              <a href="#privacy" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="#contact" className="hover:text-white transition">
                Contact Us
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
