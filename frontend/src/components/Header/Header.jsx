import React from "react";
import "./header.css";

import { useAuthDispatch, useAuthState } from "../../context/auth/auth.context";
import { useUserState, useUserDispatch } from "../../context/user/user.context";
import { logout } from "../../context/auth/auth.actions";
import { clearUser } from "../../context/user/user.actions";
import { clearOrganisations } from "../../context/organisations/organisations.actions";
import { useOrganisationsDispatch } from "../../context/organisations/organisations.context";

const Header = () => {
  const { sessionId } = useAuthState();
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();
  const organisationsDispatch = useOrganisationsDispatch();

  const { name } = useUserState();

  const handleClick = () => {
    logout(authDispatch);
    clearUser(userDispatch);
    clearOrganisations(organisationsDispatch);
    //TODO Clear shifts
  };

  return (
    <div className="header">
      <h1>Adnat</h1>
      {sessionId && name && (
        <div>
          {name}
          <button onClick={handleClick}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default Header;
