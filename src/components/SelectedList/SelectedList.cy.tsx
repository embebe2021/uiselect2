import { mount } from "cypress/react";
import { Provider } from "react-redux";
import store from "../../stores/store";
import SelectedList from "./SelectedList";

const uiSelectList = '[data-hook="uiSelectList"]';

it("should mount with store and default value", () => {
  const toggleDropdown = cy.spy();
  mount(
    <Provider store={store}>
      <SelectedList toggleDropdown={toggleDropdown}></SelectedList>
    </Provider>
  );
  cy.get(uiSelectList).should("be.visible");
});

it("function toggleDropdown should be call", () => {
  const toggleDropdown = cy.spy().as("toggleDropdown");
  mount(
    <Provider store={store}>
      <SelectedList toggleDropdown={toggleDropdown}></SelectedList>
    </Provider>
  );
  cy.get(uiSelectList).click();
  cy.get("@toggleDropdown").should("be.calledOnce");
});
