import { AuthActionTypes } from "./auth.types";

let sessionId = localStorage.getItem("sessionId")
  ? JSON.parse(localStorage.getItem("sessionId"))
  : "";

export const initialState = {
  sessionId: "" || sessionId,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case AuthActionTypes.AUTH_SUCCESS:
      return {
        ...initialState,
        sessionId: action.payload.sessionId,
        loading: false,
        errorMessage: null,
      };
    case AuthActionTypes.AUTH_ERROR:
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error.message,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...initialState,
        sessionId: "",
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
