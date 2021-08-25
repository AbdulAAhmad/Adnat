import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuthState } from "../../context/auth/auth.context";
import { useUserState, useUserDispatch } from "../../context/user/user.context";
import { getUser } from "../../context/user/user.actions";

const Home = () => {
  const { sessionId } = useAuthState();
  const user = useUserState();
  const userDispatch = useUserDispatch();
  const history = useHistory();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        let response = await getUser(userDispatch, sessionId);
        if (!response) return;
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetails();
  }, []);

  return (
    <div className="home-page">
      {!user.organisationId && <Redirect to="/join-organisation" />}
      Hello
    </div>
  );
};

export default Home;
