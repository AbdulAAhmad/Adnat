import React from "react";
import "./header.css";

import { useAuthState } from "../../context/auth/auth.context";
import { useUserState } from "../../context/user/user.context";
import { useHistory, useLocation } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";

const Header = () => {
  const { sessionId } = useAuthState();

  const { name } = useUserState();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="header">
      <h1>Adnat</h1>
      {sessionId && name && (
        <div>
          {name}
          <button
            onClick={() =>
              history.push({
                pathname: "/user/edit",
                state: { from: { pathname: location.pathname } },
              })
            }
          >
            Edit
          </button>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default Header;
