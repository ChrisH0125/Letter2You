import { useState } from "react";
import { auth } from "../../firebaseClient";
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
} from "firebase/auth";

export default function SignUp() {
  const [isLogin, setIsLogin] = useState(false); // toggle between signup/login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent refresh
    setError(null);
    setSuccess(false);

    try {
        if (isLogin) {
            await signInWithEmailAndPassword(auth, email, password);
        } else {
            await createUserWithEmailAndPassword(auth, email, password); 
        }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password (6+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
        {success && (<p className="text-green-500 mt-3 text-sm">
            {isLogin ? "Logged in!" : "Account created!"}
        </p>)}

        {/* Toggle link */}
        <p className="mt-4 text-center text-sm text-pink-700">
          {isLogin
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            className="text-pink-700 cursor-pointer hover:underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setSuccess(false);
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}
