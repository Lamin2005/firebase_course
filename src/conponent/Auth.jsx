import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { auth, google } from "../config/firebase_config";

let Auth = () => {
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [loading, setLoading] = useState(false);
  let [googleloading, setgoogleLoading] = useState(false);
  let [error, setError] = useState(false);

  console.log(auth?.currentUser?.photoURL);

  let handleSignout = async () => {
    try {
      await signOut(auth, google);
      console.log("Sign Out Successfully");
    } catch (error) {
      console.log("Error", error);
    }
  };

  let handleSubmit = async () => {
    try {
      setLoading(true);
      setError(false);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Successful Sign in.");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.log("Email is already use!");
      } else {
        console.log("Error", error);
        setError(true);
      }
      setLoading(false);
    }
  };

  let handlegoogleSubmit = async () => {
    try {
      setgoogleLoading(true);
      setError(false);
      await signInWithPopup(auth, google);
      console.log("Successful Sign in with Google.");
      setgoogleLoading(false);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.log("Email is already use!");
      } else {
        console.log("Error", error);
        setError(true);
      }
      setgoogleLoading(false);
    }
  };

  return (
    <div className="auth">
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter Your email ...."
      />
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Your password ...."
      />
      <button onClick={handleSubmit}>
        {loading && !error ? "Signing..." : "Sign In"}
      </button>
      <button onClick={handlegoogleSubmit}>
        {googleloading && !error ? "Signing..." : "Sign In with google"}
      </button>
      <button onClick={handleSignout}>Sign Out</button>
    </div>
  );
};

export default Auth;
