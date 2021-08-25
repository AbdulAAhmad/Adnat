import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthState } from "../../context/auth/auth.context";

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  const { sessionId } = useAuthState();
  return (
    <Route
      path={path}
      render={(props) =>
        !sessionId ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;
