import { mount } from "cypress/react";
import { Provider } from "react-redux";
import { data } from "../../data/data";
import { updateSearchResult } from "../../stores/ReduxStore";
import store from "../../stores/store";
import SearchBar from "./SearchBar";

const searchBar = '[data-hook="searchBar"]';
const inputSearchBar = '[data-hook="inputSearchBar"]';

it("should mount with store and default value", () => {
  const setOnSearch = cy.spy().as("setOnSearch");
  const doSearchOffline = cy.spy().as("doSearchOffline");
  const doSearchOnline = cy.spy().as("doSearchOnline");

  mount(
    <Provider store={store}>
      <SearchBar
        doSearchOnline={doSearchOnline}
        doSearchOffline={doSearchOffline}
        setOnSearch={setOnSearch}
      ></SearchBar>
    </Provider>
  );
  cy.get(searchBar).should("be.visible");
});

it("function setOnSearch shoulb be call", () => {
  const setOnSearch = cy.spy().as("setOnSearch");
  const doSearchOffline = cy.spy().as("doSearchOffline");
  const doSearchOnline = cy.spy().as("doSearchOnline");

  mount(
    <Provider store={store}>
      <SearchBar
        doSearchOnline={doSearchOnline}
        doSearchOffline={doSearchOffline}
        setOnSearch={setOnSearch}
      ></SearchBar>
    </Provider>
  );
  cy.get(inputSearchBar).type("abc");
  cy.get("@setOnSearch").should("be.called");
});
