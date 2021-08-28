import React, { useReducer } from "react";
import { initialState, ShiftsReducer } from "./shifts.reducer";

const ShiftsStateContext = React.createContext();
const ShiftsDispatchContext = React.createContext();

export function useShiftsState() {
  const context = React.useContext(ShiftsStateContext);
  if (context === undefined) {
    throw new Error("useShiftsState must be used within a ShiftsProvider");
  }

  return context;
}

export function useShiftsDispatch() {
  const context = React.useContext(ShiftsDispatchContext);
  if (context === undefined) {
    throw new Error("useShiftsDispatch must be used within a ShiftsProvider");
  }

  return context;
}

export const ShiftsProvider = ({ children }) => {
  const [shifts, dispatch] = useReducer(ShiftsReducer, initialState);

  return (
    <ShiftsStateContext.Provider value={shifts}>
      <ShiftsDispatchContext.Provider value={dispatch}>
        {children}
      </ShiftsDispatchContext.Provider>
    </ShiftsStateContext.Provider>
  );
};
