import { OrganisationsActionTypes } from "./organisations.types";

const ORGANISATIONS_ROOT_URL = `${process.env.REACT_APP_API_URL}/organisations`;

export async function getOrganisations(dispatch, sessionId) {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: sessionId },
  };

  try {
    let response = await fetch(ORGANISATIONS_ROOT_URL, requestOptions);
    let data = await response.json();

    if (data) {
      console.log(typeof data);
      dispatch({
        type: OrganisationsActionTypes.GET_ORGANISATIONS,
        payload: data,
      });
      localStorage.setItem("organisations", JSON.stringify(data));
      return data;
    }

    console.log(data.error);
    return;
  } catch (error) {
    console.log(error);
  }
}

export const clearOrganisations = (dispatch) => {
  dispatch({ type: OrganisationsActionTypes.CLEAR_ORGANISATIONS });
  localStorage.removeItem("organisations");
};
