import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthState } from "../../context/auth/auth.context";
import { useOrganisationsState } from "../../context/organisations/organisations.context";
import {
  addShift,
  clearShifts,
  getOrganisationUsers,
  getShifts,
} from "../../context/shifts/shifts.actions";
import {
  useShiftsDispatch,
  useShiftsState,
} from "../../context/shifts/shifts.context";
import { useUserState } from "../../context/user/user.context";
import "./shifts.css";

const Shifts = () => {
  const { sessionId } = useAuthState();
  const { organisationId, name, id } = useUserState();
  const { organisations } = useOrganisationsState();
  const { organisation_users, shifts } = useShiftsState();
  const shiftsDispatch = useShiftsDispatch();

  const [newShift, setNewShift] = useState({
    date: "",
    start: "",
    finish: "",
    breakLength: 0,
  });

  const [filteredEmployeeId, setFilteredEmployeeId] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const fetchOrganisationUsers = async () => {
      try {
        let response = await getOrganisationUsers(shiftsDispatch, sessionId);
        if (!response) return;
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrganisationUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        let response = await getShifts(shiftsDispatch, sessionId);
        if (!response) return;
      } catch (error) {
        console.log(error);
      }
    };

    fetchShifts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="shifts-page">
      {organisationId && (
        <h2>
          {
            organisations.find(
              (org) => String(org.id) === String(organisationId)
            ).name
          }
        </h2>
      )}
      <h3>Shifts</h3>
      <label>
        Fliter by employee:
        <select
          defaultValue=""
          onChange={(e) => setFilteredEmployeeId(e.target.value)}
        >
          <option value="">none</option>
          {organisation_users.map((orgUser) => (
            <option key={orgUser.id} value={orgUser.id}>
              {orgUser.name}
            </option>
          ))}
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <th>Employee name</th>
            <th>Shift date</th>
            <th>Start time</th>
            <th>Finish time</th>
            <th>Break length (minutes)</th>
            <th>Hours worked</th>
            <th>Shift cost</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shifts &&
            shifts
              .filter((shift) =>
                filteredEmployeeId
                  ? Number(filteredEmployeeId) === Number(shift.userId)
                  : true
              )
              .map((shift) => (
                <tr key={shift.id}>
                  <td>
                    {
                      organisation_users.find(
                        (org_user) => org_user.id === shift.userId
                      ).name
                    }
                  </td>
                  <td>{shift.start.split(" ")[0]}</td>
                  <td>{shift.start.split(" ")[1]}</td>
                  <td>{shift.finish.split(" ")[1]}</td>
                  <td>{shift.breakLength}</td>
                  <td>
                    {getHoursWorked(
                      shift.start,
                      shift.finish,
                      shift.breakLength
                    ).toFixed(2)}
                  </td>
                  <td>
                    $
                    {(
                      getHoursWorked(
                        shift.start,
                        shift.finish,
                        shift.breakLength
                      ) *
                      organisations.find(
                        (org) => Number(org.id) === Number(organisationId)
                      ).hourlyRate
                    ).toFixed(2)}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        history.push({
                          pathname: `/shifts/${shift.id}`,
                          state: { from: { pathname: location.pathname } },
                        })
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
              .reverse()}
        </tbody>
        <tfoot>
          <tr>
            <td>{name}</td>
            <td>
              <input
                type="date"
                onChange={(e) =>
                  setNewShift((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </td>
            <td>
              <input
                type="time"
                onChange={(e) =>
                  setNewShift((prev) => ({ ...prev, start: e.target.value }))
                }
              />
            </td>
            <td>
              <input
                type="time"
                onChange={(e) =>
                  setNewShift((prev) => ({ ...prev, finish: e.target.value }))
                }
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                onChange={(e) =>
                  setNewShift((prev) => ({
                    ...prev,
                    breakLength: e.target.value,
                  }))
                }
              />
            </td>
            <td colSpan="2">
              <button
                onClick={() =>
                  addShift(shiftsDispatch, sessionId, {
                    ...newShift,
                    userId: id,
                  })
                }
              >
                Create shift
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
      <button
        onClick={() => {
          history.replace("/home");
          clearShifts(shiftsDispatch);
        }}
      >
        Done
      </button>
    </div>
  );
};

const getHoursWorked = (start, finish, breakLength) => {
  const startDateTime = new Date(start);
  const finishDateTime = new Date(finish);
  const shiftLength =
    (finishDateTime.getTime() - startDateTime.getTime()) / (60 * 1000);
  return (shiftLength - breakLength) / 60;
};

export default Shifts;
