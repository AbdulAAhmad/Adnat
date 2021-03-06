import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { AuthProvider } from "./context/auth/auth.context";
import { UserProvider } from "./context/user/user.context";
import { OrganisationsProvider } from "./context/organisations/organisations.context";

import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import JoinOrganisation from "./pages/JoinOrganisation/JoinOrganisation";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import EditOrganisation from "./pages/EditOrganisation/EditOrganisation";
import { ShiftsProvider } from "./context/shifts/shifts.context";
import Shifts from "./pages/Shifts/Shifts";
import EditShift from "./pages/EditShift/EditShift";
import EditUser from "./pages/EditUser/EditUser";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <OrganisationsProvider>
          <ShiftsProvider>
            <BrowserRouter>
              <Header />
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <ProtectedRoute path="/home" component={Home} />
                <ProtectedRoute
                  path="/organisations/join"
                  component={JoinOrganisation}
                />
                <ProtectedRoute
                  path="/organisations/:id"
                  component={EditOrganisation}
                />
                <ProtectedRoute path="/user/edit" component={EditUser} />
                <ProtectedRoute exact path="/shifts" component={Shifts} />
                <ProtectedRoute path="/shifts/:id" component={EditShift} />
                <Route exact path="/" component={Login} />
                <Route path="/*">
                  <Redirect to="/home" />
                </Route>
              </Switch>
            </BrowserRouter>
          </ShiftsProvider>
        </OrganisationsProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
