import { OrganisationsActionTypes } from "./organisations.types";

let organisations = localStorage.getItem("organisations")
  ? JSON.parse(localStorage.getItem("organisations"))
  : [];

export const initialState = {
  organisations: organisations || [],
  loading: false,
  errorMessage: null,
};

export const OrganisationsReducer = (state, action) => {
  switch (action.type) {
    case OrganisationsActionTypes.GET_ORGANISATIONS:
      return {
        ...state,
        organisations: action.payload,
        loading: false,
        errorMessage: null,
      };
    case OrganisationsActionTypes.CLEAR_ORGANISATIONS:
      return {
        ...state,
        organisations: [],
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
