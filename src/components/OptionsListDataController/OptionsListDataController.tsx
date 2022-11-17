import { nanoid } from "@reduxjs/toolkit";
import _ from "lodash";
import { useSelector } from "react-redux";
import type { TransformData } from "../../stores/ReduxStore";
import type { RootState } from "../../stores/store";
import Options from "../Options/Options";
import SearchResultItem from "../SearchResultItem";
import { classes } from "./OptionsListDataController.st.css";

type OptionsListDataControllerProps = {
  isOnSearch?: boolean;
  showMode?: "single" | "tree" | "optgroup";
  selectionMode?: "single" | "multi";
  searchMode?: "offline" | "online";
  defaultShowInfo?: boolean;
};

const OptionsListDataController = ({
  isOnSearch = false,
  showMode = "single",
  selectionMode = "single",
  searchMode = "offline",
  defaultShowInfo = true,
}: OptionsListDataControllerProps): JSX.Element => {
  const sourceTransformData = useSelector(
    (state: RootState) => state.mainStore.data
  );

  const groups = _.filter(
    sourceTransformData,
    (item) => item.parent[0] === 0 || item.parent.length === 0
  ) as TransformData;

  const { searchData, searching } = useSelector(
    (state: RootState) => state.mainStore
  );

  const groupsIndex = _.map(groups, (item) => item.index) as number[];

  const searchOptionsKey: number[] = _.map(searchData, (_, index) => index);

  let dataIndex: number[] = [];

  if (isOnSearch) {
    dataIndex = searchOptionsKey;
  }

  return (
    <>
      {!isOnSearch ? (
        <Options
          dataIndex={groupsIndex[0]}
          initialMargin={0}
          showMode={showMode}
          selectionMode={selectionMode}
          defaultShowInfo={defaultShowInfo}
        />
      ) : (
        <>
          {searching ? (
            <div data-hook="searchLoader" className={classes.root}>
              <div className={classes.loader}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <div
              data-hook="searchResultInfo"
              className={classes.searchResult}
            >{`${_.size(searchData)} options`}</div>
          )}

          {_.map(dataIndex, (searchIndex, index) => (
            <SearchResultItem
              key={nanoid()}
              index={index}
              dataIndex={searchIndex}
              searchMode={searchMode}
              selectionMode={selectionMode}
              defaultShowInfo={defaultShowInfo}
            />
          ))}
        </>
      )}
    </>
  );
};

export default OptionsListDataController;
