import React, { useReducer } from "react";
import { initialState, UserReducer } from "./user.reducer";

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

export function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }

  return context;
}

export function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }

  return context;
}

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};
