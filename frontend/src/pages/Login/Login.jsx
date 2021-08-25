import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="login-page">
      <h1>Log in</h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formValues);
        }}
      >
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
    </div>
  );
};

export default Login;
