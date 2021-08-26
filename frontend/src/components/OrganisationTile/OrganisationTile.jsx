import React from "react";
import "./organisation-tile.css";

const OrganisationTile = ({ name, onJoinClick, onEditClick }) => {
  return (
    <div className="tile">
      <h3 className="tile-name">{name}</h3>
      <button className="tile-edit-button" onClick={onEditClick}>
        Edit
      </button>
      <button className="tile-join-button" onClick={onJoinClick}>
        Join
      </button>
    </div>
  );
};

export default OrganisationTile;
