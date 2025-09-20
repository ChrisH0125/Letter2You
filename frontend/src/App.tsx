import { useState } from "react";
import { auth } from "./firebaseClient";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res;
      if (isLogin) {
        res = await signInWithEmailAndPassword(auth, email, password);
      } else {
        res = await createUserWithEmailAndPassword(auth, email, password);
      }
      setUser(res.user);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (user) {
    return <h2>Welcome, {user.email}</h2>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
        {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
      </p>
    </div>
  );
}

export default App;
