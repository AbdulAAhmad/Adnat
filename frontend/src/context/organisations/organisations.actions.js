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
export async function editOrganisation(dispatch, sessionId, payload, index) {
  const { name, hourlyRate, id } = payload;
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: sessionId },
    body: JSON.stringify({ name, hourlyRate }),
  };

  try {
    let response = await fetch(
      `${ORGANISATIONS_ROOT_URL}/${id}`,
      requestOptions
    );

    if (response.ok) {
      dispatch({
        type: OrganisationsActionTypes.EDIT_ORGANISATION,
        payload,
        index,
      });
      const organisations = JSON.parse(localStorage.getItem("organisations"));
      localStorage.setItem(
        "organisations",
        JSON.stringify([
          ...organisations.slice(0, index),
          payload,
          ...organisations.slice(index + 1),
        ])
      );
      return response;
    }
    console.log(response);
    return;
  } catch (error) {
    console.log(error);
  }
}

export const clearOrganisations = (dispatch) => {
  dispatch({ type: OrganisationsActionTypes.CLEAR_ORGANISATIONS });
  localStorage.removeItem("organisations");
};
