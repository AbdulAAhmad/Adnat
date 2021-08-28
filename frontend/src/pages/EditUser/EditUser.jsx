import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthState } from "../../context/auth/auth.context";
import { changePassword, editUser } from "../../context/user/user.actions";
import { useUserDispatch, useUserState } from "../../context/user/user.context";

const EditUser = () => {
  const [detailsFormValues, setDetailsFormValues] = useState({
    name: "",
    email: "",
  });

  const [passwordFormValues, setPasswordFormValues] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const { sessionId } = useAuthState();
  const { name, email } = useUserState();
  const userDispatch = useUserDispatch();

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setDetailsFormValues({
      name,
      email,
    });
    // eslint-disable-next-line
  }, []);

  const onDetailsSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = await editUser(userDispatch, sessionId, detailsFormValues);
      if (data) history.replace(location.state.from);
    } catch (error) {
      console.log(error);
    }
  };

  const onPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await changePassword(
        userDispatch,
        sessionId,
        passwordFormValues
      );
      if (response.ok) history.replace(location.state.from);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-user-page">
      <h2>Edit details</h2>
      <form action="" onSubmit={onDetailsSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            value={detailsFormValues.name}
            onChange={(e) =>
              setDetailsFormValues((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="email"
            value={detailsFormValues.email}
            onChange={(e) =>
              setDetailsFormValues((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </label>
        <button type="submit">Update</button>
      </form>
      <h2>Change password</h2>
      <form action="" onSubmit={onPasswordSubmit}>
        <label>
          Old password:{" "}
          <input
            type="password"
            value={passwordFormValues.oldPassword}
            onChange={(e) =>
              setPasswordFormValues((prev) => ({
                ...prev,
                oldPassword: e.target.value,
              }))
            }
          />
        </label>
        <label>
          New password:{" "}
          <input
            type="password"
            value={passwordFormValues.newPassword}
            onChange={(e) =>
              setPasswordFormValues((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
          />
        </label>
        <label>
          New password confirmation:{" "}
          <input
            type="password"
            value={passwordFormValues.newPasswordConfirmation}
            onChange={(e) =>
              setPasswordFormValues((prev) => ({
                ...prev,
                newPasswordConfirmation: e.target.value,
              }))
            }
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => history.replace(location.state.from)}>Done</button>
    </div>
  );
};

export default EditUser;
