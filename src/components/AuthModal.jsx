import { useContext, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import Modal from "./Modal";
import ChaiArt from "./ChaiArt";
const AuthModal = ({ handleCloseModal }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);
  const { setIsAuthenticated, signin, signup } = useContext(AuthContext);
  const handleAuth = async (event) => {
    event.preventDefault();
    setIsAuthenticating(true);
    setError(null);
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
    } finally {
      setIsAuthenticating(false);
    }
  };
  return (
    <Modal titleId="auth-title" onClose={handleCloseModal}>
      <ChaiArt className="modal-cup" small />
      <span className="eyebrow">YOUR OWN LITTLE CHAI DIARY</span>
      <h2 id="auth-title">{isSignup ? "Join the ritual." : "Welcome back."}</h2>
      <p>
        {isSignup
          ? "Create an account to track your chai."
          : "Sign in to your account. Your cups are waiting."}
      </p>
      {error && (
        <p className="auth-message" role="status">
          {error.message}
        </p>
      )}
      <form onSubmit={handleAuth}>
        <label htmlFor="auth-email">Email</label>
        <input
          id="auth-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          placeholder="you@example.com"
        />
        <label htmlFor="auth-password">Password</label>
        <input
          id="auth-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          required
        />
        <button className="pill pill-dark" disabled={isAuthenticating}>
          {isAuthenticating
            ? "Authenticating…"
            : isSignup
              ? "Create account"
              : "Sign in"}
          <span className="pill-arrow" aria-hidden="true">
            <svg viewBox="0 0 16 16" focusable="false">
              <path d="M4 12 12 4M5 4h7v7" />
            </svg>
          </span>
        </button>
      </form>
      <p className="auth-switch">
        {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button
          className="text-button"
          onClick={() => {
            setIsSignup(!isSignup);
            setError(null);
          }}
        >
          {isSignup ? "Sign in" : "Sign up"}
        </button>
      </p>
    </Modal>
  );
};
export default AuthModal;
