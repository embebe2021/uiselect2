import React from "react";
import { header, demo } from "wix-storybook-utils/Sections";
import { CATEGORY } from "./storiesHierarchy";
import App from "../src/App";
import { Provider } from "react-redux";
import store from "../src/stores/store";
import UISelect from "../src/components/UISelect/UISelect";

const demoStory = () => {
  return (
    <Provider store={store}>
      <UISelect defaultDropDownOpen={false}></UISelect>
    </Provider>
  );
};

export default {
  category: CATEGORY.COMPONENTS,
  storyName: "UISelect standalone",

  sections: [
    header({ title: "UISelect standalone" }),

    demo({
      title: "UISelect standalone",
      component: () => demoStory(),
    }),
  ],
};
