import { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "../utils/AuthContext";

const AuthModal = ({ handleCloseModal }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { setIsAuthenticated } = useContext(AuthContext);

  const [error, setError] = useState(null);

  const { signout, signin, signup } = useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (!isSignup) {
        await signin(email, password);
        setIsAuthenticated(true);
        handleCloseModal();
      } else {
        await signup(email, password);
        setIsSignup(false);
        setEmail("");
        setPassword("");
        setError({ message: "Account created successfully. Please sign in." });
      }
    } catch (err) {
      setError(err);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <button
        onClick={handleCloseModal}
        className="absolute inset-0 cursor-pointer"
        aria-label="Close Modal"
      />
      <div
        className="relative z-10 w-full max-w-md mx-4 p-6 bg-white border border-gray-200 rounded-3xl shadow-2xl animate-[zoomIn_0.2s_ease-out]
                      dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      >
        <div className="space-y-6 text-gray-800 dark:text-white">
          <h2 className="text-3xl font-bold text-center text-orange-500 dark:text-orange-400">
            {isSignup ? "Sign Up" : "Sign In"}
          </h2>
          <p className="text-center text-lg text-gray-700 dark:text-gray-200">
            {isSignup ? "Create an account!" : "Sign in to your account!"}
          </p>
          {error && (
            <p className="text-center text-red-600 dark:text-red-400">
              {error.message === "Account created successfully. Please sign in."
                ? "✅ " + error.message
                : "❌ " + error.message}
            </p>
          )}
          <form className="flex flex-col gap-5">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-base
                         bg-gray-50 text-gray-900 placeholder-gray-500
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-orange-400"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-base
                         bg-gray-50 text-gray-900 placeholder-gray-500
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-orange-400"
              autoComplete="current-password"
            />
          </form>

          <button
            className="w-full py-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.01] text-lg cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-white
                       dark:bg-orange-600 dark:hover:bg-orange-700 dark:active:bg-orange-800 dark:focus:ring-orange-600 dark:focus:ring-offset-gray-800"
            onClick={handleAuth}
          >
            {isAuthenticating ? "Authenticating..." : "Submit"}
          </button>

          <hr className="border-gray-300 dark:border-gray-600" />

          <div className="text-center space-y-1">
            <p className="text-lg text-gray-700 dark:text-gray-200">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError(null); // Clear error when switching mode
              }}
              className="text-orange-500 hover:text-orange-600 hover:underline text-lg font-semibold transition-all duration-200
                         dark:text-orange-400 dark:hover:text-orange-500"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("popup")
  );
};

export default AuthModal;
