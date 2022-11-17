import { useState } from "react";
import { classes } from "./UISelect.st.css";
import { useDispatch, useSelector } from "react-redux";
import {
  resetKeyController,
  resetSearchResult,
  searching,
  setOptionOnFocus,
} from "../../stores/ReduxStore";
import type { RootState } from "../../stores/store";
import SearchController from "../SearchController.tsx/SearchController";
import UISelect from "./UISelect";

type UISelectProps = {
  defaultShowMode?: "single" | "tree" | "optgroup";
  defaultSelectionMode?: "single" | "multi";
  defaultSearchMode?: "offline" | "online";
  defaultDropDownOpen?: boolean;
  defaultShowInfo?: boolean;
  doSearchOffline: (val: string) => void;
  doSearchOnline: (val: string) => void;
};

const UISelectController = ({
  defaultShowMode = "tree",
  defaultSelectionMode = "single",
  defaultSearchMode = "offline",
  defaultDropDownOpen = true,
  defaultShowInfo = true,
  doSearchOffline,
  doSearchOnline,
}: UISelectProps) => {
  const [showMode, setShowMode] =
    useState<"single" | "tree" | "optgroup">(defaultShowMode);

  const [selectionMode, setSelectionMode] =
    useState<"single" | "multi">(defaultSelectionMode);

  const [searchMode, setSearchMode] =
    useState<"online" | "offline">(defaultSearchMode);

  const [showInfo, setShowInfo] = useState<boolean>(defaultShowInfo);

  const dispatch = useDispatch();
  const { searchKeywords } = useSelector((state: RootState) => state.mainStore);

  const handleChangeShowMode = (mode: "single" | "tree" | "optgroup"): void => {
    dispatch(resetKeyController());
    setShowMode(mode);
  };

  const handleChangeSelectionMode = (mode: "single" | "multi"): void => {
    setSelectionMode(mode);
  };

  const handleChangeSearchMode = (mode: "online" | "offline"): void => {
    if (searchKeywords.length > 0) {
      if (mode === "offline") {
        doSearchOffline(searchKeywords);
      }
      if (mode === "online") {
        doSearchOnline(searchKeywords);
      }
      dispatch(resetSearchResult());
      dispatch(searching(true));
    }

    setSearchMode(mode);
  };

  const handleShowInfo = (): void => {
    setShowInfo(!showInfo);
  };

  return (
    <>
      <div data-hook="uiSelectController" className={classes.root}>
        <div>
          <div>Show Mode:</div>
          <span>
            <input
              type="radio"
              id="single"
              checked={showMode === "single"}
              onChange={() => handleChangeShowMode("single")}
            />
            <label htmlFor="single">single</label>
          </span>
          <span>
            <input
              type="radio"
              id="tree"
              checked={showMode === "tree"}
              onChange={() => handleChangeShowMode("tree")}
            />
            <label htmlFor="tree">tree</label>
          </span>
          <span>
            <input
              type="radio"
              id="optgroup"
              checked={showMode === "optgroup"}
              onChange={() => handleChangeShowMode("optgroup")}
            />
            <label htmlFor="optgroup">optgroup</label>
          </span>

          <div>Selection Mode:</div>
          <span>
            <input
              type="radio"
              id="singleSelect"
              checked={selectionMode === "single"}
              onChange={() => handleChangeSelectionMode("single")}
            />
            <label htmlFor="singleSelect">single select</label>
          </span>
          <span>
            <input
              type="radio"
              id="multiSelect"
              checked={selectionMode === "multi"}
              onChange={() => handleChangeSelectionMode("multi")}
            />
            <label htmlFor="multiSelect">multi select</label>
          </span>

          <div>Search Mode:</div>
          <span>
            <input
              type="radio"
              id="offlineSearch"
              checked={searchMode === "offline"}
              onChange={() => handleChangeSearchMode("offline")}
            />
            <label htmlFor="offlineSearch">offline</label>
          </span>
          <span>
            <input
              type="radio"
              id="onlineSearch"
              checked={searchMode === "online"}
              onChange={() => handleChangeSearchMode("online")}
            />
            <label htmlFor="onlineSearch">online</label>
          </span>

          <div>
            <label htmlFor="showInfo">Show option child + level:</label>
            <input
              type="checkbox"
              id="showInfo"
              onChange={handleShowInfo}
              checked={showInfo}
            />
          </div>
        </div>
      </div>
      <UISelect
        defaultShowMode={showMode}
        defaultSelectionMode={selectionMode}
        defaultSearchMode={searchMode}
        defaultDropDownOpen={defaultDropDownOpen}
        defaultShowInfo={showInfo}
      />
    </>
  );
};

export default SearchController(UISelectController);
