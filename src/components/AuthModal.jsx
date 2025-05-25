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
        // signin
        console.log("account already hai....");
        await signin(email, password);
        setIsAuthenticated(true);
        handleCloseModal();
      } else {
        // signup
        console.log("account create karr raha hoon");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <button
        onClick={handleCloseModal}
        className="absolute inset-0 cursor-pointer"
        aria-label="Close Modal"
      />
      <div className="relative z-10 w-full max-w-md mx-4 p-6 bg-slate-950 border-4 border-orange-100 rounded-3xl shadow-2xl animate-[zoomIn_0.2s_ease-out]">
        <div className="space-y-6 text-slate-800">
          <h2 className="text-3xl font-bold text-center text-orange-500">
            {isSignup ? "Sign Up" : "Sign In"}
          </h2>
          <p className="text-center text-lg text-white">
            {isSignup ? "Create an account!" : "Sign in to your account!"}
          </p>
          {error && (
            <p className="text-white text-center">
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
              className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-md  text-white placeholder:text-white"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              type="password"
              className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-md text-white placeholder:text-white"
              autoComplete=""
            />
          </form>

          <button
            className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-100 hover:scale-[1.02] text-lg cursor-pointer"
            onClick={handleAuth}
          >
            {isAuthenticating ? "Authenticating..." : "Submit"}
          </button>

          <hr className="border-slate-200" />

          <div className="text-center space-y-1">
            <p className="text-lg text-white">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button
              onClick={() => {
                setIsSignup(!isSignup);
              }}
              className="text-orange-500 hover:text-orange-600 hover:underline text-lg font-semibold transition-all"
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
