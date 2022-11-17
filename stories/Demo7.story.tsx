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
      <UISelect defaultShowMode="tree" defaultSelectionMode="single"></UISelect>
    </Provider>
  );
};

export default {
  category: CATEGORY.TREE,
  storyName: "Select single options",

  sections: [
    header({
      title: "Select single options",
    }),

    demo({
      title: "Select single options",
      component: () => demoStory(),
    }),
  ],
};
