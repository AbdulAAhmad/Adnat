import { UserActionTypes } from "./user.types";

const USERS_ROOT_URL = `${process.env.REACT_APP_API_URL}/users`;
const CURRENT_USER_URL = `${USERS_ROOT_URL}/me`;
const CHANGE_PASSWORD_URL = `${CURRENT_USER_URL}/change_password`;
const ORGANISATIONS_ROOT_URL = `${process.env.REACT_APP_API_URL}/organisations`;
const CREATE_JOIN_ORGANISATION_URL = `${ORGANISATIONS_ROOT_URL}/create_join`;
const JOIN_ORGANISATION_URL = `${ORGANISATIONS_ROOT_URL}/join`;
const LEAVE_ORGANISATION_URL = `${ORGANISATIONS_ROOT_URL}/leave`;

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

export async function createJoinOrganisation(dispatch, sessionId, payLoad) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: sessionId },
    body: JSON.stringify(payLoad),
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

export async function joinOrganisation(dispatch, sessionId, payLoad) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: sessionId },
    body: JSON.stringify(payLoad),
  };

  try {
    dispatch({ type: UserActionTypes.GET_USER_REQUEST });
    let response = await fetch(JOIN_ORGANISATION_URL, requestOptions);
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

export async function leaveOrganisation(dispatch, sessionId) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: sessionId },
  };

  try {
    let response = await fetch(LEAVE_ORGANISATION_URL, requestOptions);

    if (response.ok) {
      dispatch({
        type: UserActionTypes.LEAVE_ORGANISATION,
      });
      const currentUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...currentUser, organisationId: null })
      );
      return;
    }
    console.log(response);
    return;
  } catch (error) {
    console.log(error);
  }
}
export async function editUser(dispatch, sessionId, payload) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: sessionId },
    body: JSON.stringify(payload),
  };

  try {
    let response = await fetch(CURRENT_USER_URL, requestOptions);
    let data = await response.json();

    if (data) {
      dispatch({
        type: UserActionTypes.EDIT_USER,
        payload: data,
      });
      const currentUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({ ...currentUser, ...data }));
      return data;
    }
    console.log(data.error);
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function changePassword(dispatch, sessionId, payload) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: sessionId },
    body: JSON.stringify(payload),
  };

  try {
    let response = await fetch(CHANGE_PASSWORD_URL, requestOptions);

    if (response.ok) {
      return response;
    }
    console.log(response.error);
    return;
  } catch (error) {
    console.log(error);
  }
}
