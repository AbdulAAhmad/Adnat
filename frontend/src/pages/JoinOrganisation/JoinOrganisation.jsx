import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import OrganisationTile from "../../components/OrganisationTile/OrganisationTile";
import { useAuthState } from "../../context/auth/auth.context";
import { getOrganisations } from "../../context/organisations/organisations.actions";
import {
  useOrganisationsDispatch,
  useOrganisationsState,
} from "../../context/organisations/organisations.context";
import {
  createJoinOrganisation,
  joinOrganisation,
} from "../../context/user/user.actions";
import { useUserDispatch, useUserState } from "../../context/user/user.context";
import "./join-organisation.css";

const JoinOrganisation = () => {
  const { sessionId } = useAuthState();
  const { organisationId } = useUserState();
  const userDispatch = useUserDispatch();
  const organisationsDispatch = useOrganisationsDispatch();
  const { organisations } = useOrganisationsState();
  const history = useHistory();
  const location = useLocation();

  const [formValues, setFormValues] = useState({
    name: "",
    hourlyRate: "",
  });

  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        let response = await getOrganisations(organisationsDispatch, sessionId);
        if (!response) return;
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrganisations();
  }, []);

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

  const handleJoinClick = (id) => async () => {
    try {
      let response = await joinOrganisation(userDispatch, sessionId, {
        organisationId: id,
      });
      if (!response.id) return;
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="join-organisation-page">
      {organisationId && <Redirect to="/home" />}
      <p>You aren't a member of any organisations.</p>
      <p>Join an existing one or create a new one.</p>
      <h2>Organisations</h2>
      <div className="organisations-container">
        {organisations.length < 1 ? (
          <div>No organisations exist</div>
        ) : (
          organisations.map((org) => (
            <OrganisationTile
              key={org.id}
              name={org.name}
              onJoinClick={handleJoinClick(org.id)}
              onEditClick={() =>
                history.push({
                  pathname: `/organisations/${org.id}`,
                  state: { from: { pathname: location.pathname } },
                })
              }
            />
          ))
        )}
      </div>

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
