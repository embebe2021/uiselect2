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
        defaultShowMode="optgroup"
        defaultDropDownOpen={false}
      ></UISelect>
    </Provider>
  );
};

export default {
  category: CATEGORY.GROUP,
  storyName: "Group options",

  sections: [
    header({
      title: "Group options",
    }),

    demo({
      title: "Group options",
      component: () => demoStory(),
    }),
  ],
};
