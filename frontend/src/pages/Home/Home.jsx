import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "../../context/auth/auth.context";
import { useUserDispatch } from "../../context/user/user.context";
import { getUser } from "../../context/user/user.actions";

const Home = () => {
  const { sessionId } = useAuthState();
  const userDispatch = useUserDispatch();
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

  return <div className="home-page">Home</div>;
};

export default Home;
