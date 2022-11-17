import { mount } from "cypress/react";
import { Provider } from "react-redux";
import { data } from "../../data/data";
import { updateSearchResult } from "../../stores/ReduxStore";
import store from "../../stores/store";
import OptionsListKeyController from "./OptionsListKeyController";

// searchMode?: "offline" | "online";
//   showMode?: "single" | "tree" | "optgroup";
//   selectionMode?: "single" | "multi";
//   isShowDropdown?: boolean;
//   isOnSearch?: boolean;
//   defaultShowInfo?: boolean;

const selectContainer = '[data-hook="selectContainer"]';

it("should mount with store and default value", () => {
  mount(
    <Provider store={store}>
      <OptionsListKeyController></OptionsListKeyController>
    </Provider>
  );
});

it("show single options", () => {
  mount(
    <Provider store={store}>
      <OptionsListKeyController showMode="single"></OptionsListKeyController>
    </Provider>
  );
  cy.get(selectContainer).should("be.visible");
});

it("show tree options", () => {
  mount(
    <Provider store={store}>
      <OptionsListKeyController showMode="tree"></OptionsListKeyController>
    </Provider>
  );
  cy.get(selectContainer).should("be.visible");
});

it("show optgroup options", () => {
  mount(
    <Provider store={store}>
      <OptionsListKeyController showMode="optgroup"></OptionsListKeyController>
    </Provider>
  );
  cy.get(selectContainer).should("be.visible");
});

it("select single options", () => {
  mount(
    <Provider store={store}>
      <OptionsListKeyController selectionMode="single"></OptionsListKeyController>
    </Provider>
  );
  cy.get(selectContainer).should("be.visible");
});
