import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "../../context/auth/auth.context";
import { createJoinOrganisation } from "../../context/user/user.actions";
import { useUserDispatch } from "../../context/user/user.context";
import "./join-organisation.css";

const JoinOrganisation = () => {
  const { sessionId } = useAuthState();
  const userDispatch = useUserDispatch();
  const history = useHistory();

  const [formValues, setFormValues] = useState({
    name: "",
    hourlyRate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await createJoinOrganisation(
        userDispatch,
        sessionId,
        formValues
      );
      if (!response.id) return;
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="join-organisation-page">
      <p>You aren't a member of any organisations.</p>
      <p>Join an existing one or create a new one.</p>

      <h2>Organisations</h2>

      <h2>Create organisation</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <label htmlFor="hourlyRate">Hourly Rate: $</label>
        <input
          id="hourlyRate"
          name="hourlyRate"
          type="number"
          min="0"
          step="any"
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, hourlyRate: e.target.value }))
          }
        />
        <button type="submit">Create and join</button>
      </form>
    </div>
  );
};

export default JoinOrganisation;
