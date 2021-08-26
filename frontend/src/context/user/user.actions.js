import { UserActionTypes } from "./user.types";

const USERS_ROOT_URL = `${process.env.REACT_APP_API_URL}/users`;
const CURRENT_USER_URL = `${USERS_ROOT_URL}/me`;
const ORGANISATIONS_ROOT_URL = `${process.env.REACT_APP_API_URL}/organisations`;
const CREATE_JOIN_ORGANISATION_URL = `${ORGANISATIONS_ROOT_URL}/create_join`;

export async function getUser(dispatch, sessionId) {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: sessionId },
  };

  try {
    dispatch({ type: UserActionTypes.GET_USER_REQUEST });
    let response = await fetch(CURRENT_USER_URL, requestOptions);
    let data = await response.json();

    if (data) {
      dispatch({ type: UserActionTypes.GET_USER_SUCCESS, payload: data });
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    }

    dispatch({ type: UserActionTypes.GET_USER_ERROR, error: data.error });
    console.log(data.error);
    return;
  } catch (error) {
    dispatch({ type: UserActionTypes.GET_USER_ERROR, error: error });
    console.log(error);
  }
}

export const clearUser = (dispatch) => {
  dispatch({ type: UserActionTypes.CLEAR_USER });
  localStorage.removeItem("user");
};

export async function createJoinOrganisation(dispatch, sessionId, authPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: sessionId },
    body: JSON.stringify(authPayload),
  };

  try {
    dispatch({ type: UserActionTypes.GET_USER_REQUEST });
    let response = await fetch(CREATE_JOIN_ORGANISATION_URL, requestOptions);
    let data = await response.json();

    if (data.id) {
      dispatch({
        type: UserActionTypes.CREATE_JOIN_ORGANISATION,
        payload: data,
      });
      const currentUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...currentUser, organisationId: data.id })
      );
      return data;
    }

    dispatch({ type: UserActionTypes.GET_USER_ERROR, error: data.error });
    console.log(data.error);
    return;
  } catch (error) {
    dispatch({ type: UserActionTypes.GET_USER_ERROR, error: error });
    console.log(error);
  }
}

export async function joinOrganisation(dispatch, sessionId, authPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: sessionId },
    body: JSON.stringify(authPayload),
  };

  try {
    dispatch({ type: UserActionTypes.GET_USER_REQUEST });
    let response = await fetch(CREATE_JOIN_ORGANISATION_URL, requestOptions);
    let data = await response.json();

    if (data.id) {
      dispatch({
        type: UserActionTypes.CREATE_JOIN_ORGANISATION,
        payload: data,
      });
      const currentUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...currentUser, organisationId: data.id })
      );
      return data;
    }

    dispatch({ type: UserActionTypes.GET_USER_ERROR, error: data.error });
    console.log(data.error);
    return;
  } catch (error) {
    dispatch({ type: UserActionTypes.GET_USER_ERROR, error: error });
    console.log(error);
  }
}
