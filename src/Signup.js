import React, { useEffect } from "react";
import { Input } from "@material-ui/core";
import { useState } from "react";
import "./Signup.css";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        history.push("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [history]);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) =>
        authUser.user.updateProfile({ displayName: username })
      )
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="signup">
      <img
        className="signup__image"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
        alt="logo"
      />

      <form className="signup__form">
        <div className="signup__formControl">
          <Input
            value={username}
            className="signup__input"
            placeholder="Username"
            type="text"
            disableUnderline={true}
            id="username__input"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="signup__formControl">
          <Input
            value={email}
            className="signup__input"
            placeholder="Email"
            type="email"
            disableUnderline={true}
            id="email__input"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="signup__formControl">
          <Input
            value={password}
            className="signup__input"
            placeholder="Password"
            type="password"
            disableUnderline={true}
            id="password__input"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit" className="signup__submit" onClick={signUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
