import { ShiftsActionTypes } from "./shifts.types";

let organisation_users = localStorage.getItem("organisation_users")
  ? JSON.parse(localStorage.getItem("organisation_users"))
  : [];
let shifts = localStorage.getItem("shifts")
  ? JSON.parse(localStorage.getItem("shifts"))
  : [];

export const initialState = {
  organisation_users: organisation_users || [],
  shifts: shifts || [],
  errorMessage: null,
};
export const ShiftsReducer = (state, action) => {
  switch (action.type) {
    case ShiftsActionTypes.GET_ORGANISATION_USERS:
      return {
        ...state,
        organisation_users: action.payload,
      };
    case ShiftsActionTypes.GET_SHIFTS:
      return {
        ...state,
        shifts: action.payload,
      };
    case ShiftsActionTypes.ADD_SHIFT:
      return {
        ...state,
        shifts: [...state.shifts, action.payload],
      };
    case ShiftsActionTypes.FETCH_ERROR:
      return {
        ...state,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
