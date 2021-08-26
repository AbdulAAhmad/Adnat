import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "../../context/auth/auth.context";
import { useUserDispatch, useUserState } from "../../context/user/user.context";
import { getUser } from "../../context/user/user.actions";
import { getOrganisations } from "../../context/organisations/organisations.actions";
import { useOrganisationsDispatch } from "../../context/organisations/organisations.context";

const Home = () => {
  const { sessionId } = useAuthState();
  const { organisationId } = useUserState();
  const userDispatch = useUserDispatch();
  const organisationsDispatch = useOrganisationsDispatch();
  const history = useHistory();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        let response = await getUser(userDispatch, sessionId);
        if (!response) return;
        if (!response.organisationId) history.push("/join-organisation");
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
        // if (!response.organisationId) history.push("/join-organisation");
      } catch (error) {
        console.log(error);
      }
    };
    if (organisationId) {
      fetchOrganisations();
    }
  }, [organisationId]);

  return <div className="home-page">Home</div>;
};

export default Home;
