import React from "react";
import "./organisation-tile.css";

const OrganisationTile = ({ name, onJoinClick, onEditClick }) => {
  return (
    <div className="tile" data-testid="org_tile">
      <h3 className="tile-name">{name}</h3>
      <button
        className="tile-edit-button"
        onClick={onEditClick}
        data-testid="edit_button"
      >
        Edit
      </button>
      <button
        className="tile-join-button"
        onClick={onJoinClick}
        data-testid="join_button"
      >
        Join
      </button>
    </div>
  );
};

export default OrganisationTile;
