import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import OrganisationTile from "./OrganisationTile";

afterEach(() => {
  cleanup();
});

test("it renders an organisation tile", () => {
  render(<OrganisationTile />);
  const orgTile = screen.getByTestId("org_tile");
  expect(orgTile).toBeInTheDocument();
});

test("it renders an organisation tile with name from props", () => {
  render(<OrganisationTile name="Org Tile Name" />);
  const orgTile = screen.getByTestId("org_tile");
  expect(orgTile).toBeInTheDocument();
  expect(orgTile).toHaveTextContent("Org Tile Name");
});

test("it calls join callback on join button click", () => {
  const mockJoin = jest.fn();
  render(<OrganisationTile name="Org Tile Name" onJoinClick={mockJoin} />);
  const joinButton = screen.getByTestId("join_button");
  joinButton.click();
  expect(mockJoin).toHaveBeenCalled();
});

test("it calls edit callback on edit button click", () => {
  const mockEdit = jest.fn();
  render(<OrganisationTile name="Org Tile Name" onEditClick={mockEdit} />);
  const joinButton = screen.getByTestId("edit_button");
  joinButton.click();
  expect(mockEdit).toHaveBeenCalled();
});
