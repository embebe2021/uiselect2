import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { nanoid } from "@reduxjs/toolkit";
import type { RootState } from "../../stores/store";
import {
  OptionsType,
  setOptionsFolding,
  selectMultiOptions,
  selectSingleOption,
  setHoverIndex,
} from "../../stores/ReduxStore";
import { st, classes } from "./Options.st.css";
import { useDrag, useDrop } from "react-dnd";

type OptionsProps = {
  showMode?: "single" | "tree" | "optgroup";
  selectionMode?: "single" | "multi";
  dataIndex?: number;
  initialMargin?: number;
  marginIncrease?: number;
  defaultShowInfo?: boolean;
};

const Options = (props: OptionsProps): JSX.Element => {
  const {
    showMode = "tree",
    selectionMode = "multi",
    dataIndex = 0,
    initialMargin = 0,
    marginIncrease = 2,
    defaultShowInfo = true,
  } = props;

  const transformData = useSelector((state: RootState) => state.mainStore.data);
  const { optionOnFocus, foldingList } = useSelector(
    (state: RootState) => state.mainStore
  );

  const dispatch = useDispatch();
  const showChild = foldingList.includes(dataIndex);

  const option = transformData[dataIndex] as OptionsType;
  const childs = option?.child;
  const margin = initialMargin + marginIncrease;
  const uId = option.data.uid;

  const isOptionDisable = showMode === "optgroup" && childs.length > 0;

  let isLastChild = false;
  let optionLevel = 0;

  if (dataIndex) {
    const parentID = option?.parent[0];
    const parent = transformData[parentID];
    const brothers = parent?.child;
    if (brothers[brothers?.length - 1] === dataIndex) isLastChild = true;
  }

  if (dataIndex === transformData.length - 1) isLastChild = true;

  (function getOptionLevel(option: OptionsType) {
    if (option?.parent[0]) {
      optionLevel++;

      getOptionLevel(transformData[option.parent[0]]);
    }
  })(option);

  const handleShowChild = (e: React.MouseEvent): void => {
    e.stopPropagation();

    if (childs.length > 0) {
      dispatch(setOptionsFolding(dataIndex));
    }
  };

  const handleCheckOption = (e: React.MouseEvent): void => {
    e.stopPropagation();

    if (!isOptionDisable) {
      if (selectionMode === "multi") {
        dispatch(selectMultiOptions(dataIndex));
      }
      if (selectionMode === "single") {
        dispatch(selectSingleOption(dataIndex));
      }
    }
  };

  const getStyleMargin = (): React.CSSProperties => {
    if (showMode === "tree" || showMode === "optgroup")
      return { paddingLeft: `${marginIncrease}rem` };
    else return {};
  };

  const handleMouseOver = (): void => {
    if (!isOptionDisable) {
      dispatch(setHoverIndex(dataIndex));
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "option",
    item: () => {
      if (!isOptionDisable) {
        return { id: uId };
      } else {
        return null;
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "option",
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleDrop = ({ id }) => {
    const fromIndex = id;
    // console.log(
    //   "🚀 ~ file: Options.tsx ~ line 126 ~ handleDrop ~ fromIndex",
    //   fromIndex
    // );
    // const toIndex = dataIndex;
    // console.log(
    //   "🚀 ~ file: Options.tsx ~ line 128 ~ handleDrop ~ toIndex",
    //   toIndex
    // );
    // dispatch(swapTableColumn({ from: dragItemId, to: columnId }));
  };

  return (
    <div data-hook="optionsRoot" className={classes.root}>
      <div
        className={st(classes.parentWrapper, {
          isDotted: showMode === "tree" || showMode === "optgroup",
        })}
      >
        {(showMode === "tree" || showMode === "optgroup") && (
          <>
            {childs?.length > 0 ? (
              <label
                className={st(classes.parentIconWrapper, {
                  isDisable: isOptionDisable,
                  isNotDefaultRoot: dataIndex !== 0,
                })}
                onClick={(e) => handleShowChild(e)}
              >
                {childs?.length > 0 && (
                  <div
                    className={st(classes.parentIcon, {
                      isOpen: showChild,
                      isDisable: showMode === "optgroup",
                    })}
                  >
                    <svg viewBox="0 0 512 512">
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </div>
                )}
              </label>
            ) : (
              <div className={classes.parentSeparator}></div>
            )}
          </>
        )}
        <div
          data-hook="parentOptions"
          className={st(classes.parent, {
            needClear:
              childs?.length > 0 && isLastChild && showMode !== "single",
          })}
        >
          <div ref={drop} className={classes.dropContainer}>
            <div
              data-option={isOptionDisable ? false : true}
              data-hook={`options${option.index}`}
              data-index={dataIndex}
              data-group={childs?.length > 0 && true}
              onMouseEnter={handleMouseOver}
              onClick={(e) => handleCheckOption(e)}
              ref={drag}
              className={st(classes.parentContainer, {
                isSingle: showMode === "single",
                isActive: showMode !== "optgroup" || childs.length === 0,
                isChecked: option?.selected,
                isDisable: isOptionDisable,
                isOnFocus: optionOnFocus === dataIndex,
              })}
            >
              <div className={classes.leftSide}>
                {isOptionDisable ? null : (
                  <input
                    readOnly
                    type="checkbox"
                    className={classes.parentInput}
                    checked={option?.selected}
                  />
                )}
                <span
                  className={st(classes.parentLabel, {
                    isDisable: isOptionDisable,
                  })}
                >
                  {option?.data?.label}
                </span>
              </div>
              {defaultShowInfo && (
                <div className={classes.rightSide}>
                  <span>Childs: {childs?.length}</span>
                  {/* <span>--DataIndex: {dataIndex}--</span> */}
                  <span> - Option level: {optionLevel}</span>
                </div>
              )}
            </div>
          </div>
          {_.size(childs) > 0 &&
            showChild &&
            showMode === "tree" &&
            _.map(childs, (childIndex) => (
              <div
                data-hook="childOptions"
                className={st(classes.childWrapper, {
                  isDotted: showMode === "tree",
                })}
                style={getStyleMargin()}
                key={nanoid()}
              >
                <Options
                  dataIndex={childIndex}
                  initialMargin={margin}
                  showMode={showMode}
                  selectionMode={selectionMode}
                  defaultShowInfo={defaultShowInfo}
                />
              </div>
            ))}

          {_.size(childs) > 0 &&
            (showMode === "single" || showMode === "optgroup") &&
            _.map(childs, (childIndex) => (
              <div
                data-hook="childOptions"
                className={st(classes.childWrapper, {
                  isDotted: showMode === "optgroup",
                })}
                style={getStyleMargin()}
                key={nanoid()}
              >
                <Options
                  dataIndex={childIndex}
                  initialMargin={margin}
                  showMode={showMode}
                  selectionMode={selectionMode}
                  defaultShowInfo={defaultShowInfo}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Options;
