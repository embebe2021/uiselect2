import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./ReduxStore";

const initStore = () => {
  return configureStore({
    reducer: { mainStore: mainReducer },
  });
};

const store = initStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
