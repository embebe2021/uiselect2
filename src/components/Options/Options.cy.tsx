import { mount } from "cypress/react";
import { Provider } from "react-redux";
import { data } from "../../data/data";
import { searching, updateSearchResult } from "../../stores/ReduxStore";
import store from "../../stores/store";
import Options from "./Options";

const optionsRoot = '[data-hook="optionsRoot"]';

it("should mount with store and default value", () => {
  mount(
    <Provider store={store}>
      <Options></Options>
    </Provider>
  );
  cy.get(optionsRoot).should("be.visible");
});

it("should mount one option and it has 0 child", () => {
  const parentOptions = '[data-hook="parentOptions"]';
  const childOptions = '[data-hook="childOptions"]';
  mount(
    <Provider store={store}>
      <Options dataIndex={2}></Options>
    </Provider>
  );
  cy.get(parentOptions).should("be.visible");
  cy.get(optionsRoot).find(childOptions).should("not.exist");
});

it("should mount one option and it has more child", () => {
  const parentOptions = '[data-hook="parentOptions"]';
  const childOptions = '[data-hook="childOptions"]';
  mount(
    <Provider store={store}>
      <Options dataIndex={5}></Options>
    </Provider>
  );
  cy.get(parentOptions).should("be.visible");
  cy.get(optionsRoot).find(childOptions).should("be.visible");
});
