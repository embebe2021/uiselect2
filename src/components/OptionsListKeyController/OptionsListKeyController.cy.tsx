import { mount } from "cypress/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { data } from "../../data/data";
import { updateSearchResult } from "../../stores/ReduxStore";
import store from "../../stores/store";
import OptionsListKeyController from "./OptionsListKeyController";

const selectContainer = '[data-hook="selectContainer"]';

it("should mount with store and default value", () => {
  mount(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <OptionsListKeyController></OptionsListKeyController>
      </DndProvider>
    </Provider>
  );
});

it("show single options", () => {
  mount(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <OptionsListKeyController showMode="single"></OptionsListKeyController>
      </DndProvider>
    </Provider>
  );
  cy.get(selectContainer).should("be.visible");
});

it("show tree options", () => {
  mount(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <OptionsListKeyController showMode="tree"></OptionsListKeyController>
      </DndProvider>
    </Provider>
  );
  cy.get(selectContainer).should("be.visible");
});

it("show optgroup options", () => {
  mount(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <OptionsListKeyController showMode="optgroup"></OptionsListKeyController>
      </DndProvider>
    </Provider>
  );
  cy.get(selectContainer).should("be.visible");
});

it("select single options", () => {
  mount(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <OptionsListKeyController selectionMode="single"></OptionsListKeyController>
      </DndProvider>
    </Provider>
  );
  cy.get(selectContainer).should("be.visible");
});
