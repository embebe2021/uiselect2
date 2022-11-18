import { mount } from "cypress/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { data } from "../../data/data";
import { searching, updateSearchResult } from "../../stores/ReduxStore";
import store from "../../stores/store";
import OptionsListDataController from "./OptionsListDataController";

it("should mount with store and default value", () => {
  mount(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <OptionsListDataController></OptionsListDataController>
      </DndProvider>
    </Provider>
  );
});

it("show loader on search", () => {
  store.dispatch(searching(true));
  const searchLoader = '[data-hook="searchLoader"]';
  mount(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <OptionsListDataController
          isOnSearch={true}
        ></OptionsListDataController>
      </DndProvider>
    </Provider>
  );
  cy.get(searchLoader).should("be.visible");
});
