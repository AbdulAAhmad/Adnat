import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authenticate, AUTH_SIGNUP_URL } from "../../context/auth/auth.actions";
import { useAuthDispatch, useAuthState } from "../../context/auth/auth.context";
import "./signup.css";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();
  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      let response = await authenticate(AUTH_SIGNUP_URL, dispatch, formValues);
      if (!response.sessionId) return;
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-page">
      <h1>Sign up</h1>
      <form action="" onSubmit={handleSignup}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />

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

        <label htmlFor="passwordConfirmation">Password confirmation</label>
        <input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          onChange={(e) =>
            setFormValues((prev) => ({
              ...prev,
              passwordConfirmation: e.target.value,
            }))
          }
        />
        <button type="submit">Sign up</button>
      </form>
      <Link to="/login">Log in</Link>
    </div>
  );
};

export default Signup;
