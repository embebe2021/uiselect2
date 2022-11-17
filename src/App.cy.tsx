import { mount } from "cypress/react18";
import { Provider } from "react-redux";
import App from "./App";
import UISelect from "./components/UISelect";
import store from "./stores/store";

const uiSelectWrapper = '[data-hook="uiSelectWrapper"]';
const selectContainer = '[data-hook="selectContainer"]';
const uiSelectList = '[data-hook="uiSelectList"]';
const dropdownWrapper = '[data-hook="dropdownWrapper"]';
const selectedList = '[data-hook="selectListContainer"]';
const clearAllSelected = '[data-hook="clearAllSelected"]';
const btnDone = '[data-hook="btnDone"]';
const inputSearchBar = '[data-hook="inputSearchBar"]';
const searchResultInfo = '[data-hook="searchResultInfo"]';

describe("Test UISelect", () => {
  it("should mount", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect />
      </Provider>
    );
    cy.get(uiSelectList).click();
    cy.get(uiSelectWrapper).should("be.visible");
  });

  it("should render option list", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect />
      </Provider>
    );
    cy.get(uiSelectList).click();
    cy.get(selectContainer).should("have.length.greaterThan", 0);
  });

  it("open and close dropdown menu", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect />
      </Provider>
    );
    cy.get(uiSelectList).click();
    cy.get(dropdownWrapper).should("be.visible");
    cy.get(uiSelectList).click();
    cy.get(dropdownWrapper).should("not.exist");
  });

  it("dropdown menu select multi options", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect defaultDropDownOpen={true} defaultSelectionMode="multi" />
      </Provider>
    );

    let counter = 0;
    let expectedNumber = 66;

    recusionSelect();
    function recusionSelect() {
      cy.get(`[data-hook="options${counter}"]`).click();
      counter++;
      if (counter < expectedNumber) {
        recusionSelect();
      }
    }
    cy.get(selectedList).children().should("have.length", expectedNumber);

    recusionDeselect();
    function recusionDeselect() {
      cy.get(`[data-hook="options${counter - 1}"]`).click();
      counter--;
      if (counter > 0) {
        recusionDeselect();
      }
    }
    cy.get(selectedList).children().should("have.length", 1);
  });

  it("dropdown menu select single options", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect defaultDropDownOpen={true} />
      </Provider>
    );

    let counter = 0;
    recusionClick();
    function recusionClick() {
      cy.get(`[data-hook="options${counter}"]`).click();
      counter++;
      if (counter < 65) {
        recusionClick();
      }
    }
  });

  it("select multi options and clear all selected options", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect
          defaultDropDownOpen={true}
          defaultSelectionMode="multi"
          defaultShowMode="tree"
        />
      </Provider>
    );

    let counter = 0;

    recusionSelect();
    function recusionSelect() {
      cy.get(`[data-hook="options${counter}"]`).click();
      counter++;
      if (counter < 5) {
        recusionSelect();
      }
    }
    cy.get(clearAllSelected).click();
    cy.get(selectedList).children().should("have.length", 1);
  });

  it("use Tab to focus on search input", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect defaultDropDownOpen={true} />
      </Provider>
    );
    cy.get("body").tab();
    cy.get(inputSearchBar).should("be.focused");
  });

  it("use upArrow and downArrow to move between options", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect
          defaultDropDownOpen={true}
          defaultSelectionMode="multi"
          defaultShowMode="tree"
        />
      </Provider>
    );

    let counter = 0;

    recusionDownArrow();
    function recusionDownArrow() {
      cy.get("body").type("{downArrow}");
      counter++;
      if (counter < 30) {
        recusionDownArrow();
      }
    }

    recusionUpArrow();
    function recusionUpArrow() {
      cy.get("body").type("{upArrow}");
      counter--;
      if (counter > 0) {
        recusionUpArrow();
      }
    }
  });

  it("use Enter to select options", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect
          defaultDropDownOpen={true}
          defaultSelectionMode="multi"
          defaultShowMode="tree"
        />
      </Provider>
    );

    let counter = 0;

    recusionDownArrow();
    function recusionDownArrow() {
      cy.get("body").type("{downArrow}").type("{enter}");
      counter++;
      if (counter < 30) {
        recusionDownArrow();
      }
    }

    recusionUpArrow();
    function recusionUpArrow() {
      cy.get("body").type("{upArrow}").type("{enter}");
      counter--;
      if (counter > 0) {
        recusionUpArrow();
      }
    }
    cy.get(clearAllSelected).click();
  });

  it("use Shift+Enter to open/close group options", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect
          defaultDropDownOpen={true}
          defaultSelectionMode="multi"
          defaultShowMode="tree"
        />
      </Provider>
    );
    cy.get("body")
      .type("{downArrow}{downArrow}{downArrow}")
      .type("{shift}{enter}")
      .type("{shift}{enter}")
      .type("{downArrow}{downArrow}{downArrow}")
      .type("{shift}{enter}")
      .type("{shift}{enter}")
      .type("{downArrow}")
      .type("{shift}{enter}")
      .type("{shift}{enter}")
      .type("{downArrow}")
      .type("{shift}{enter}")
      .type("{shift}{enter}")
      .type("{downArrow}")
      .type("{shift}{enter}")
      .type("{shift}{enter}");

    // cy.get(clearAllSelected).click();
  });

  it("click to Done button to close dropdown", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect defaultDropDownOpen={false} />
      </Provider>
    );

    cy.get(uiSelectList).click();
    cy.get(dropdownWrapper).should("be.visible");
    cy.get(btnDone).click();
    cy.get(dropdownWrapper).should("not.exist");
  });

  it("search offline ", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect defaultDropDownOpen={true} />
      </Provider>
    );

    cy.get(inputSearchBar).type("women");
    cy.get(searchResultInfo).should("be.visible");
    cy.get(selectContainer).children().should("have.length.greaterThan", 1);
    cy.get(inputSearchBar).clear();
  });

  it("search offline and key upArrow/downArrow to move/select options", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect defaultDropDownOpen={true} defaultSelectionMode="multi" />
      </Provider>
    );

    cy.get(inputSearchBar).type("men");
    cy.wait(800);
    let counter = 0;

    recusionDownArrow();
    function recusionDownArrow() {
      cy.get("body").type("{downArrow}").type("{enter}");
      counter++;
      if (counter < 7) {
        recusionDownArrow();
      }
    }

    recusionUpArrow();
    function recusionUpArrow() {
      cy.get("body").type("{upArrow}").type("{enter}");
      counter--;
      if (counter > 0) {
        recusionUpArrow();
      }
    }
    cy.get(clearAllSelected).click();
    cy.get(inputSearchBar).clear();
  });

  it("search online and key upArrow/downArrow to move between options", () => {
    cy.viewport(1000, 1000);
    mount(
      <Provider store={store}>
        <UISelect defaultDropDownOpen={true} defaultSearchMode="online" />
      </Provider>
    );

    cy.get(inputSearchBar).type("a");
    cy.get(searchResultInfo).should("be.visible");
    cy.get(selectContainer).children().should("have.length.greaterThan", 1);
    cy.get("body")
      .type("{downArrow}{downArrow}{downArrow}")
      .type("{upArrow}{upArrow}{upArrow}");
  });
});
