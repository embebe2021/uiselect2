import { mount } from "cypress/react";
import ButtonDone from "./ButtonDone";

it("should mount", () => {
  const toggleDropdown = cy.spy().as("toggleDropdown");
  mount(<ButtonDone toggleDropdown={toggleDropdown}></ButtonDone>);
});

it("should call function toggleDropdown", () => {
  const toggleDropdown = cy.spy().as("toggleDropdown");
  mount(<ButtonDone toggleDropdown={toggleDropdown}></ButtonDone>);

  cy.get('[data-hook="btnDone"]').click();
  cy.get("@toggleDropdown").should("be.called");
});
