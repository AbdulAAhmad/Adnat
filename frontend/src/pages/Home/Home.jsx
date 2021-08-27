import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthState } from "../../context/auth/auth.context";
import { useUserDispatch, useUserState } from "../../context/user/user.context";
import { getUser, leaveOrganisation } from "../../context/user/user.actions";
import { getOrganisations } from "../../context/organisations/organisations.actions";
import {
  useOrganisationsDispatch,
  useOrganisationsState,
} from "../../context/organisations/organisations.context";

const Home = () => {
  const { sessionId } = useAuthState();
  const { organisationId } = useUserState();
  const userDispatch = useUserDispatch();
  const organisationsDispatch = useOrganisationsDispatch();
  const { organisations } = useOrganisationsState();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        let response = await getUser(userDispatch, sessionId);
        if (!response) return;
        if (!response.organisationId) history.push("/organisations/join");
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        let response = await getOrganisations(organisationsDispatch, sessionId);
        if (!response) return;
      } catch (error) {
        console.log(error);
      }
    };
    if (organisationId) {
      fetchOrganisations();
    } else {
      history.push("/organisations/join");
    }
  }, [organisationId]);

  return (
    <div className="home-page">
      {(organisationId &&
        organisations
          .filter((org) => org.id === organisationId)
          .map((org) => (
            <div key={`${org.id}-tile`} className="my-org-tile">
              <h1>{org.name}</h1>
              <button>View Shifts</button>
              <button
                onClick={() =>
                  history.push({
                    pathname: `/organisations/${organisationId}`,
                    state: { from: { pathname: location.pathname } },
                  })
                }
              >
                Edit
              </button>
              <button
                onClick={() => leaveOrganisation(userDispatch, sessionId)}
              >
                Leave
              </button>
            </div>
          ))) || <h1>Something went wrong</h1>}
    </div>
  );
};

export default Home;
