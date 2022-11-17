import { mount } from "cypress/react";
import { Provider } from "react-redux";
import { data } from "../../data/data";
import { searching, updateSearchResult } from "../../stores/ReduxStore";
import store from "../../stores/store";
import OptionsListDataController from "./OptionsListDataController";

it("should mount with store and default value", () => {
  mount(
    <Provider store={store}>
      <OptionsListDataController></OptionsListDataController>
    </Provider>
  );
});

it("show loader on search", () => {
  store.dispatch(searching(true));
  const searchLoader = '[data-hook="searchLoader"]';
  mount(
    <Provider store={store}>
      <OptionsListDataController isOnSearch={true}></OptionsListDataController>
    </Provider>
  );
  cy.get(searchLoader).should("be.visible");
});
