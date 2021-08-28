import { ShiftsActionTypes } from "./shifts.types";

const USERS_ROOT_URL = `${process.env.REACT_APP_API_URL}/users`;
const SHIFTS_ROOT_URL = `${process.env.REACT_APP_API_URL}/shifts`;

export async function getOrganisationUsers(dispatch, sessionId) {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: sessionId },
  };

  try {
    let response = await fetch(USERS_ROOT_URL, requestOptions);
    let data = await response.json();

    if (data) {
      dispatch({
        type: ShiftsActionTypes.GET_ORGANISATION_USERS,
        payload: data,
      });
      localStorage.setItem("organisation_users", JSON.stringify(data));
      return data;
    }

    dispatch({
      type: ShiftsActionTypes.FETCH_ERROR,
      error: data.error,
    });
    console.log(data.error);
    return;
  } catch (error) {
    dispatch({
      type: ShiftsActionTypes.FETCH_ERROR,
      error: error,
    });
    console.log(error);
  }
}

export async function getShifts(dispatch, sessionId) {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: sessionId },
  };

  try {
    let response = await fetch(SHIFTS_ROOT_URL, requestOptions);
    let data = await response.json();

    if (data) {
      dispatch({ type: ShiftsActionTypes.GET_SHIFTS, payload: data });
      localStorage.setItem("shifts", JSON.stringify(data));
      return data;
    }

    dispatch({ type: ShiftsActionTypes.FETCH_ERROR, error: data.error });
    console.log(data.error);
    return;
  } catch (error) {
    dispatch({ type: ShiftsActionTypes.FETCH_ERROR, error: error });
    console.log(error);
  }
}

export async function addShift(dispatch, sessionId, payLoad) {
  const { start: startTime, finish: finishTime, date, ...rest } = payLoad;

  const start = `${date} ${startTime}`;
  let finish = "";
  if (startTime > finishTime) {
    let tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + 1);
    finish = `${tempDate.toLocaleDateString("en-CA")} ${finishTime}`;
  } else {
    finish = `${date} ${finishTime}`;
  }

  const newPayLoad = { ...rest, start, finish };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: sessionId },
    body: JSON.stringify(newPayLoad),
  };

  try {
    let response = await fetch(SHIFTS_ROOT_URL, requestOptions);
    let data = await response.json();

    if (data.id) {
      dispatch({
        type: ShiftsActionTypes.ADD_SHIFT,
        payload: data,
      });
      const storedShifts = JSON.parse(localStorage.getItem("shifts"));
      localStorage.setItem("shifts", JSON.stringify([...storedShifts, data]));
      return data;
    }

    dispatch({ type: ShiftsActionTypes.FETCH_ERROR, error: data.error });
    console.log(data.error);
    return;
  } catch (error) {
    dispatch({ type: ShiftsActionTypes.FETCH_ERROR, error: error });
    console.log(error);
  }
}
