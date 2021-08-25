import { UserActionTypes } from "./user.types";

let user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : "";

export const initialState = {
  id: user.id || null,
  organisationId: user.organisationId || null,
  name: user.name || null,
  email: user.email || null,
  loading: false,
  errorMessage: null,
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case UserActionTypes.GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        organisationId: action.payload.organisationId,
        name: action.payload.name,
        email: action.payload.email,
        loading: false,
        errorMessage: null,
      };
    case UserActionTypes.GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.error.message,
      };
    case UserActionTypes.CLEAR_USER:
      return {
        ...state,
        id: null,
        organisationId: null,
        name: null,
        email: null,
        loading: false,
        errorMessage: null,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
