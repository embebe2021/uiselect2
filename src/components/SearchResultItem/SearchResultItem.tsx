import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OptionsType,
  selectMultiOptions,
  selectSingleOption,
  setHoverIndex,
} from "../../stores/ReduxStore";
import type { RootState } from "../../stores/store";
import { st, classes } from "./SearchResultItem.st.css";

type SearchResultItemProps = {
  index?: number;
  dataIndex?: number;
  searchMode?: "offline" | "online";
  selectionMode?: "single" | "multi";
  defaultShowInfo?: boolean;
};

const SearchResultItem = ({
  index = 1,
  dataIndex = 1,
  searchMode = "offline",
  selectionMode = "single",
  defaultShowInfo = true,
}: SearchResultItemProps): JSX.Element => {
  const dispatch = useDispatch();

  const { optionOnFocus, hoverIndex } = useSelector(
    (state: RootState) => state.mainStore
  );

  const sourceData = useSelector((state: RootState) => state.mainStore.data);

  const searchData = useSelector(
    (state: RootState) => state.mainStore.searchData
  );

  const thisResult = searchData[dataIndex] as OptionsType & { title: string };

  const indexInSourceData = thisResult.index;
  const originData = sourceData[indexInSourceData];

  let label: string = "";
  searchMode === "offline"
    ? (label = thisResult?.data?.label)
    : (label = thisResult.title);

  const thisChild = thisResult?.child;

  function getPath(options: OptionsType, sourceData: any[]): string {
    let rawPath: string[] = [];
    let originPath: string = "";

    (function getParentLabel(option: OptionsType) {
      const hasParent = _.size(option?.parent) > 0;

      if (hasParent) {
        const parentIndex = option?.parent[0];
        const parentLabel = sourceData[parentIndex]?.data.label;

        rawPath.push(parentLabel);
        getParentLabel(sourceData[parentIndex]);
      }
    })(options);

    const reverseRawPath = rawPath.reverse();
    originPath = reverseRawPath[0];

    if (_.size(reverseRawPath) > 1) {
      for (let i = 0; i < rawPath.length - 1; i++) {
        originPath = originPath + "/" + reverseRawPath[i + 1];
      }
    } else originPath = reverseRawPath[0];

    return originPath;
  }

  const handleMouseOver = (): void => {
    dispatch(setHoverIndex(dataIndex));
  };

  const handleSelect = (e: React.MouseEvent): void => {
    e.stopPropagation();
    if (searchMode === "offline") {
      if (selectionMode === "multi") {
        dispatch(selectMultiOptions(originData.index));
      }
      if (selectionMode === "single") {
        dispatch(selectSingleOption(originData.index));
      }
    }
  };

  return (
    <div
      data-hook="searchResultItem"
      onMouseEnter={handleMouseOver}
      onClick={(e) => handleSelect(e)}
      className={st(classes.root, {
        isOnHover: hoverIndex === dataIndex,
        isOnFocus: optionOnFocus === index,
      })}
      data-option={true}
      data-group={thisChild?.length > 0 && true}
      data-index={searchMode === "offline" ? thisResult.index : dataIndex}
    >
      {searchMode === "offline" && (
        <input
          type="checkbox"
          readOnly
          className={classes.checkbox}
          checked={originData.selected}
        />
      )}

      <div className={classes.infoWrapper}>
        {searchData && (
          <>
            <div className={classes.label}>{label}</div>
            {defaultShowInfo && <div>dataIndex: {thisResult.index}</div>}
          </>
        )}
        {searchMode === "offline" && (
          <div className={classes.path}>{getPath(thisResult, sourceData)}</div>
        )}
      </div>
    </div>
  );
};

export default SearchResultItem;
