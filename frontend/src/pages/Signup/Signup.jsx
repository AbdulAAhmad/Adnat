import React, { useState } from "react";
import "./signup.css";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  return (
    <div className="signup-page">
      <h1>Sign up</h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
    </div>
  );
};

export default Signup;
