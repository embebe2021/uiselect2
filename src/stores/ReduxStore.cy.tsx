import {
  clearAllSelected,
  resetSearchResult,
  searching,
  searchOffline,
  selectMultiOptions,
  selectSingleOption,
  setHoverIndex,
  setOptionOnFocus,
  setOptionsFolding,
  updateSearchResult,
} from "./ReduxStore";
import store from "./store";

describe("Test Store", () => {
  it("setOptionOnFocus change optionOnFocus", () => {
    store.dispatch(setOptionOnFocus(8));
    const { optionOnFocus } = store.getState().mainStore;
    expect(optionOnFocus).to.be.eq(8);
  });

  it("setHoverIndex change hoverIndex", () => {
    store.dispatch(setHoverIndex(16));
    const { hoverIndex } = store.getState().mainStore;
    expect(hoverIndex).to.be.eq(16);
  });

  it("setOptionsFolding add/remove index to foldingList", () => {
    store.dispatch(setOptionsFolding(59));
    const { foldingList } = store.getState().mainStore;
    expect(foldingList).not.to.contain(59);
  });

  it("selectMultiOptions set selected to true", () => {
    store.dispatch(selectMultiOptions(23));
    const { data } = store.getState().mainStore;
    expect(data[23].selected).to.eq(true);
  });

  it("clearAllSelected set all selected to false", () => {
    store.dispatch(clearAllSelected());
    const { data } = store.getState().mainStore;

    let counter = 0;
    recusionCheck();
    function recusionCheck() {
      expect(data[counter].selected).to.be.eq(false);
      if (counter < data.length - 1) {
        counter++;
        recusionCheck();
      }
    }
  });

  it("selectSingleOption set one index to true and all selected to false", () => {
    store.dispatch(selectSingleOption(20));
    const { data } = store.getState().mainStore;

    let counter = 0;
    recusionCheck();
    function recusionCheck() {
      if (counter === 20) {
        expect(data[counter].selected).to.be.eq(true);
      } else {
        expect(data[counter].selected).to.be.eq(false);
      }
      if (counter < data.length - 1) {
        counter++;
        recusionCheck();
      }
    }
  });

  it("searchOffline must search extract label result", () => {
    const expectLabel = "Bags";

    store.dispatch(searchOffline(expectLabel));
    const { searchData } = store.getState().mainStore;
    expect(searchData[0].data.label).to.be.eq(expectLabel);
  });

  it("updateSearchResult update extract result to searchData", () => {
    const expectResult = [{ id: 1, label: "Bags" }];

    store.dispatch(updateSearchResult(expectResult));
    const { searchData } = store.getState().mainStore;
    expect(searchData[0].id).to.be.eq(expectResult[0].id);
    expect(searchData[0].label).to.be.eq(expectResult[0].label);
  });

  it("resetSearchResult reset searchData", () => {
    const expectResult = [{ id: 1, label: "Bags" }];

    store.dispatch(updateSearchResult(expectResult));
    store.dispatch(resetSearchResult());
    const { searchData } = store.getState().mainStore;
    expect(searchData.length).to.be.eq(0);
  });

  it("searching reset searchData when true", () => {
    const expectResult = [{ id: 1, label: "Bags" }];

    store.dispatch(updateSearchResult(expectResult));
    store.dispatch(searching(true));
    const { searchData } = store.getState().mainStore;
    expect(searchData.length).to.be.eq(0);
  });
});
