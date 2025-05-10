import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Authentication = ({ handleCloseModal }) => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);

  const { signup, login } = useAuth();

  async function handleAuthentication() {
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.length < 6 ||
      isAuthenticating
    ) {
      return;
    }

    try {
      setIsAuthenticating(true);
      setError(null);

      if (isRegistration) {
        // register a user
        await signup(email, password);
      } else {
        // login a user
        await login(email, password);
      }
      handleCloseModal();
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setIsAuthenticating(false);
    }
  }

  return (
    <div className="space-y-6 text-slate-800">
      <h2 className="text-3xl font-bold text-center text-orange-500">
        {isRegistration ? "Sign Up" : "Login"}
      </h2>
      <p className="text-center text-lg text-white">
        {isRegistration ? "Create an account!" : "Sign in to your account!"}
      </p>
      {error && <p className="text-white text-center">❌ {error}</p>}
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
      />

      <button
        onClick={handleAuthentication}
        className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-100 hover:scale-[1.02] text-lg cursor-pointer"
      >
        {isAuthenticating ? "Authenticating..." : "Submit"}
      </button>

      <hr className="border-slate-200" />

      <div className="text-center space-y-1">
        <p className="text-lg text-white">
          {isRegistration
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <button
          onClick={() => setIsRegistration(!isRegistration)}
          className="text-orange-500 hover:text-orange-600 hover:underline text-lg font-semibold transition-all"
        >
          {isRegistration ? "Sign in" : "Sign up"}
        </button>
      </div>
    </div>
  );
};

export default Authentication;
