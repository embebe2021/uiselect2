import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { data } from "../data/data";
type ActionTypes = {
  setOptionOnFocus: (
    state: initDataType,
    action: PayloadAction<number>
  ) => void;
  resetKeyController: (state: initDataType) => void;
  setOptionsFolding: (
    state: initDataType,
    action: PayloadAction<number>
  ) => void;
  selectMultiOptions: (
    state: initDataType,
    action: PayloadAction<number>
  ) => void;
  selectSingleOption: (
    state: initDataType,
    action: PayloadAction<number>
  ) => void;
  clearAllSelected: (state: initDataType) => void;
  setHoverIndex: (state: initDataType, action: PayloadAction<number>) => void;
  updateSearchKeyword: (
    state: initDataType,
    action: PayloadAction<string>
  ) => void;
  searchOffline: (state: initDataType, action: PayloadAction<string>) => void;
  updateSearchResult: (state: initDataType, action: PayloadAction<any>) => void;
  resetSearchResult: (state: initDataType) => void;
  searching: (state: initDataType, action: PayloadAction<boolean>) => void;
};

export type OptionsType = {
  index: number;
  parent: number[];
  child: number[];
  data: {
    label: string;
    uid: string;
  };
  selected: boolean;
  disable: boolean;
};
export type TransformData = OptionsType[];

export const initState = {
  data: data,
  searchData: [],
  searching: false,
  searchKeywords: "",
  optionOnFocus: null,
  foldingList: [
    0, 1, 4, 5, 6, 7, 11, 14, 18, 19, 20, 24, 28, 32, 39, 41, 42, 47, 50, 51,
    56, 59,
  ],
  hoverIndex: null,
};

const AppStore = createSlice<initDataType, ActionTypes>({
  name: "grid",
  initialState: initState as initDataType,
  reducers: {
    setOptionOnFocus: (state, action) => {
      state.optionOnFocus = action.payload;
    },
    setHoverIndex: (state, action) => {
      state.hoverIndex = action.payload;
    },
    resetKeyController: (state) => {
      state.hoverIndex = null;
      state.optionOnFocus = null;
    },
    setOptionsFolding: (state, action) => {
      const foldingList = _.cloneDeep(state.foldingList);
      const foldingIndex = action.payload;

      foldingList.includes(foldingIndex)
        ? (state.foldingList = _.filter(
            foldingList,
            (index) => index !== foldingIndex
          ))
        : state.foldingList.push(foldingIndex);
    },
    selectMultiOptions: (state, action) => {
      const index = action.payload;
      const { selected } = _.clone(state.data[index]);
      state.data[index].selected = !selected;
    },
    clearAllSelected: (state) => {
      const repOptionlist = _.cloneDeep(state.data);

      state.data = _.map(repOptionlist, (option) => ({
        ...option,
        selected: false,
      }));
    },
    selectSingleOption: (state, action) => {
      const index = action.payload;
      const repOptionlist = _.cloneDeep(state.data);
      if (state.data[index].selected === false) {
        const lastResult = _.map(repOptionlist, (option) => ({
          ...option,
          selected: false,
        }));

        lastResult[index].selected = true;
        state.data = lastResult;
      } else {
        state.data = _.map(repOptionlist, (option) => ({
          ...option,
          selected: false,
        }));
      }
    },
    updateSearchKeyword: (state, action) => {
      state.searching = true;
      state.searchData = [];
      state.searchKeywords = action.payload;
    },
    searchOffline: (state, action) => {
      const keywords = action.payload;
      let repData = _.cloneDeep(state.data);

      let findResult = _.filter(repData, (option) => {
        return option.data.label.toLowerCase().includes(keywords.toLowerCase());
      });

      state.searchData = [];
      state.hoverIndex = null;
      state.optionOnFocus = null;
      state.searchData = findResult;
      state.searching = false;
    },
    updateSearchResult: (state, action) => {
      const result = action.payload;

      state.searchData = [];
      state.hoverIndex = null;
      state.optionOnFocus = null;
      state.searchData = result;
      state.searching = false;
    },
    resetSearchResult: (state) => {
      state.hoverIndex = null;
      state.searchData = [];
      state.searching = false;
    },
    searching: (state, action) => {
      state.searching = action.payload;
      if (action.payload) {
        state.searchData = [];
      }
    },
  },
});

export const {
  setOptionOnFocus,
  resetKeyController,
  setOptionsFolding,
  selectMultiOptions,
  clearAllSelected,
  selectSingleOption,
  setHoverIndex,
  updateSearchKeyword,
  searchOffline,
  updateSearchResult,
  resetSearchResult,
  searching,
} = AppStore.actions;

export default AppStore.reducer;
