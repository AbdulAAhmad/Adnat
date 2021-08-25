import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./context/auth/auth.context";

import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
