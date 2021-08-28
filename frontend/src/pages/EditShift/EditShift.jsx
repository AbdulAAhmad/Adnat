import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useAuthState } from "../../context/auth/auth.context";
import { editShift, removeShift } from "../../context/shifts/shifts.actions";
import {
  useShiftsDispatch,
  useShiftsState,
} from "../../context/shifts/shifts.context";
import { useUserState } from "../../context/user/user.context";
import "./edit-shift.css";

const getShiftIndex = (shift_array, search_id) => {
  for (let i = 0; i < shift_array.length; i++) {
    if (Number(shift_array[i].id) === Number(search_id)) {
      return i;
    }
  }
  return -1;
};

const EditShift = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const { sessionId } = useAuthState();
  const { id: userId } = useUserState();
  const { shifts } = useShiftsState();
  const shiftsDispatch = useShiftsDispatch();

  const [formValues, setFormValues] = useState({
    date: "",
    start: "",
    finish: "",
    breakLength: "",
  });

  const [currentShiftIndex, setCurrentShiftIndex] = useState(null);

  useEffect(() => {
    setCurrentShiftIndex(getShiftIndex(shifts, id));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentShiftIndex) {
      setFormValues({
        date: shifts[currentShiftIndex].start.split(" ")[0],
        start: shifts[currentShiftIndex].start.split(" ")[1],
        finish: shifts[currentShiftIndex].finish.split(" ")[1],
        breakLength: shifts[currentShiftIndex].breakLength,
      });
    }
    // eslint-disable-next-line
  }, [currentShiftIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await editShift(
        shiftsDispatch,
        sessionId,
        { id, userId, ...formValues },
        currentShiftIndex
      );
      if (response.ok) history.replace(location.state.from);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      let response = await removeShift(
        shiftsDispatch,
        sessionId,
        id,
        currentShiftIndex
      );
      if (response.ok) history.replace(location.state.from);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Edit Shift</h2>
      <form action="" onSubmit={handleSubmit}>
        <label>
          Shift date:
          <input
            required
            type="date"
            value={formValues.date}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </label>
        <label>
          Start time:
          <input
            required
            type="time"
            value={formValues.start}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, start: e.target.value }))
            }
          />
        </label>
        <label>
          Finish time:
          <input
            required
            type="time"
            value={formValues.finish}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, finish: e.target.value }))
            }
          />
        </label>
        <label>
          Break length (minutes):
          <input
            required
            type="number"
            min="0"
            value={formValues.breakLength}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                breakLength: e.target.value,
              }))
            }
          />
        </label>

        <button type="submit">Update</button>
        <button onClick={handleDeleteClick}>Delete</button>
        <button onClick={() => history.replace(location.state.from)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditShift;
