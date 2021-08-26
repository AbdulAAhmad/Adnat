import React, { useReducer } from "react";
import { initialState, OrganisationsReducer } from "./organisations.reducer";

const OrganisationsStateContext = React.createContext();
const OrganisationsDispatchContext = React.createContext();

export function useOrganisationsState() {
  const context = React.useContext(OrganisationsStateContext);
  if (context === undefined) {
    throw new Error(
      "useOrganisationsState must be used within a OrganisationsProvider"
    );
  }

  return context;
}

export function useOrganisationsDispatch() {
  const context = React.useContext(OrganisationsDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useOrganisationsDispatch must be used within a OrganisationsProvider"
    );
  }

  return context;
}

export const OrganisationsProvider = ({ children }) => {
  const [organisations, dispatch] = useReducer(
    OrganisationsReducer,
    initialState
  );

  return (
    <OrganisationsStateContext.Provider value={organisations}>
      <OrganisationsDispatchContext.Provider value={dispatch}>
        {children}
      </OrganisationsDispatchContext.Provider>
    </OrganisationsStateContext.Provider>
  );
};
