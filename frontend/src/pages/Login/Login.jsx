import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { authenticate, AUTH_LOGIN_URL } from "../../context/auth/auth.actions";
import { useAuthDispatch, useAuthState } from "../../context/auth/auth.context";
import "./login.css";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response = await authenticate(AUTH_LOGIN_URL, dispatch, formValues);
      if (!response.sessionId) return;
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <h1>Log in</h1>
      <form action="" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button type="submit">Log in</button>
      </form>
      <Link to="/signup">Sign up</Link>
    </div>
  );
};

export default Login;
