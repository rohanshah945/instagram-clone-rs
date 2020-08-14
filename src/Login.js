import React, { useState, useEffect } from "react";
import { Input } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import "./Login.css";

function Login() {
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

  const login = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <div className="login">
        <img
          className="login__image"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
          alt="logo"
        />

        <form className="login__form">
          <div className="login__formControl">
            <Input
              value={email}
              className="login__input"
              placeholder="Email"
              type="email"
              disableUnderline={true}
              id="email__input"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="login__formControl">
            <Input
              value={password}
              className="login__input"
              placeholder="Password"
              type="password"
              disableUnderline={true}
              id="password__input"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit" className="login__submit" onClick={login}>
            Log In
          </button>
        </form>
      </div>
      <div className="login__signup">
        <h3>
          Don't have an account?{" "}
          <Link to="/signup" className="login__signupLink">
            Sign up
          </Link>
        </h3>
      </div>
    </>
  );
}

export default Login;
