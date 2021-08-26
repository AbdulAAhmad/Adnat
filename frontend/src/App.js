import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./context/auth/auth.context";
import { UserProvider } from "./context/user/user.context";
import { OrganisationsProvider } from "./context/organisations/organisations.context";

import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import JoinOrganisation from "./pages/JoinOrganisation/JoinOrganisation";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <OrganisationsProvider>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <ProtectedRoute path="/home" component={Home} />
              <ProtectedRoute
                path="/join-organisation"
                component={JoinOrganisation}
              />
              <Route path="/" component={Login} />
            </Switch>
          </BrowserRouter>
        </OrganisationsProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
