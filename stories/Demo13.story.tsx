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
      <UISelect
        defaultShowMode="tree"
        defaultSelectionMode="single"
        defaultSearchMode="online"
      ></UISelect>
    </Provider>
  );
};

export default {
  category: CATEGORY.SEARCH,
  storyName: "Search online",

  sections: [
    header({
      title: "Search online",
    }),

    demo({
      title: "Search online",
      component: () => demoStory(),
    }),
  ],
};
