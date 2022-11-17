import { mount } from "cypress/react";
import { Provider } from "react-redux";
import { data } from "../../data/data";
import { updateSearchResult } from "../../stores/ReduxStore";
import store from "../../stores/store";
import SearchResultItem from "./SearchResultItem";

it("should mount with store and default value", () => {
  store.dispatch(updateSearchResult(data));
  mount(
    <Provider store={store}>
      <SearchResultItem></SearchResultItem>
    </Provider>
  );
  cy.get('[data-hook="searchResultItem"]').should("be.visible");
});
