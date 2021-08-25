import { AuthActionTypes } from "./auth.types";

const AUTH_ROOT_URL = `${process.env.REACT_APP_API_URL}/auth`;
export const AUTH_LOGIN_URL = `${AUTH_ROOT_URL}/login`;
export const AUTH_SIGNUP_URL = `${AUTH_ROOT_URL}/signup`;

export async function authenticate(url, dispatch, authPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authPayload),
  };

  try {
    dispatch({ type: AuthActionTypes.AUTH_REQUEST });
    let response = await fetch(url, requestOptions);
    let data = await response.json();

    if (data.sessionId) {
      dispatch({ type: AuthActionTypes.AUTH_SUCCESS, payload: data });
      localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
      return data;
    }

    dispatch({ type: AuthActionTypes.AUTH_ERROR, error: data.error });
    console.log(data.error);
    return;
  } catch (error) {
    dispatch({ type: AuthActionTypes.AUTH_ERROR, error: error });
    console.log(error);
  }
}

export async function logout(dispatch) {
  dispatch({ type: AuthActionTypes.LOGOUT });
  localStorage.removeItem("sessionId");
}
