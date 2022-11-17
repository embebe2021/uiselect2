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
      <UISelect defaultShowMode="tree" defaultSelectionMode="multi"></UISelect>
    </Provider>
  );
};

export default {
  category: CATEGORY.TREE,
  storyName: "Select multiple options",

  sections: [
    header({
      title: "Select multiple options",
    }),

    demo({
      title: "Select multiple options",
      component: () => demoStory(),
    }),
  ],
};
