import { mount } from "cypress/react";
import { Provider } from "react-redux";
import store from "../../stores/store";
import UISelect from "./UISelect";

const uiSelectWrapper = '[data-hook="uiSelectWrapper"]';

it("should mount with store and default value", () => {
  mount(
    <Provider store={store}>
      <UISelect></UISelect>
    </Provider>
  );
  cy.get(uiSelectWrapper).should("be.visible");
});
