import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useAuthState } from "../../context/auth/auth.context";
import { editOrganisation } from "../../context/organisations/organisations.actions";
import {
  useOrganisationsDispatch,
  useOrganisationsState,
} from "../../context/organisations/organisations.context";
import "./edit-organisation.css";

const getOrgIndex = (org_array, search_id) => {
  for (let i = 0; i < org_array.length; i++) {
    if (Number(org_array[i].id) === Number(search_id)) {
      return i;
    }
  }
  return -1;
};

const EditOrganisation = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const { sessionId } = useAuthState();
  const organisationsDispatch = useOrganisationsDispatch();
  const { organisations } = useOrganisationsState();

  const [formValues, setFormValues] = useState({
    name: "",
    hourlyRate: "",
  });

  const [currentOrganisationIndex, setcurrentOrganisationIndex] =
    useState(null);

  useEffect(() => {
    setcurrentOrganisationIndex(getOrgIndex(organisations, id));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await editOrganisation(
        organisationsDispatch,
        sessionId,
        {
          ...organisations[currentOrganisationIndex],
          ...(formValues.name !== "" && { name: formValues.name }),
          ...(formValues.hourlyRate !== "" && {
            hourlyRate: Number(formValues.hourlyRate),
          }),
        },
        currentOrganisationIndex
      );
      if (response.ok) history.replace(location.state.from);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Edit Organisation</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder={
            organisations[currentOrganisationIndex]
              ? organisations[currentOrganisationIndex].name
              : ""
          }
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <label htmlFor="hourlyRate">Hourly Rate: $</label>
        <input
          id="hourlyRate"
          name="hourlyRate"
          placeholder={
            organisations[currentOrganisationIndex]
              ? organisations[currentOrganisationIndex].hourlyRate
              : ""
          }
          type="number"
          min="0"
          step="any"
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, hourlyRate: e.target.value }))
          }
        />
        <button type="submit">Update</button>
        <button onClick={() => history.replace(location.state.from)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditOrganisation;
