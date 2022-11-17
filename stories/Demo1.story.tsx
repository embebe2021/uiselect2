import React from "react";
import { header, demo } from "wix-storybook-utils/Sections";
import { CATEGORY } from "./storiesHierarchy";
import App from "../src/App";
import { Provider } from "react-redux";
import store from "../src/stores/store";
import UISelectController from "../src/components/UISelect/UISelectController";

const demoStory = () => {
  return (
    <Provider store={store}>
      <UISelectController defaultDropDownOpen={false} />
    </Provider>
  );
};

export default {
  category: CATEGORY.COMPONENTS,
  storyName: "UISelect with controller",

  sections: [
    header({ title: "UISelect with controller" }),

    demo({
      title: "UISelect with controller",
      component: () => demoStory(),
    }),
  ],
};
