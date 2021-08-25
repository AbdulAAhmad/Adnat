import { UserActionTypes } from "./user.types";

const USERS_ROOT_URL = `${process.env.REACT_APP_API_URL}/users`;
const CURRENT_USER_URL = `${USERS_ROOT_URL}/me`;

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
