import React from "react";
import { logout } from "../../context/auth/auth.actions";
import { useAuthDispatch } from "../../context/auth/auth.context";
import { clearOrganisations } from "../../context/organisations/organisations.actions";
import { useOrganisationsDispatch } from "../../context/organisations/organisations.context";
import { clearShifts } from "../../context/shifts/shifts.actions";
import { useShiftsDispatch } from "../../context/shifts/shifts.context";
import { clearUser } from "../../context/user/user.actions";
import { useUserDispatch } from "../../context/user/user.context";

const LogoutButton = () => {
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();
  const organisationsDispatch = useOrganisationsDispatch();
  const shiftsDispatch = useShiftsDispatch();

  const handleClick = () => {
    logout(authDispatch);
    clearUser(userDispatch);
    clearOrganisations(organisationsDispatch);
    clearShifts(shiftsDispatch);
  };

  return <button onClick={handleClick}>Log Out</button>;
};

export default LogoutButton;
