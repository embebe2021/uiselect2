import _ from "lodash";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOptionOnFocus,
  setOptionsFolding,
  selectMultiOptions,
  selectSingleOption,
} from "../../stores/ReduxStore";
import type { RootState } from "../../stores/store";
import OptionsListDataController from "../OptionsListDataController";
import { classes } from "./OptionsListKeyController.st.css";

type OptionsListKeyControllerProps = {
  searchMode?: "offline" | "online";
  showMode?: "single" | "tree" | "optgroup";
  selectionMode?: "single" | "multi";
  isShowDropdown?: boolean;
  isOnSearch?: boolean;
  defaultShowInfo?: boolean;
};

const OptionsListKeyController = ({
  searchMode = "online",
  showMode = "single",
  selectionMode = "single",
  isOnSearch = false,
  defaultShowInfo = true,
}: OptionsListKeyControllerProps) => {
  const dispatch = useDispatch();

  const { hoverIndex, foldingList, searchKeywords, searchData } = useSelector(
    (state: RootState) => state.mainStore
  );

  const containerRef = useRef<HTMLInputElement>(null);

  const listOptionEl = useRef<{ element: Element; dataIndex: number }[]>([]);

  useEffect(() => {
    const listOptionElement = document.querySelectorAll('[data-option="true"]');

    listOptionEl.current = [];

    _.each(listOptionElement, (element, index) => {
      let dataIndex = element.getAttribute("data-index");

      listOptionEl.current[index] = {
        element,
        dataIndex: parseInt(dataIndex as string),
      };
    });
  }, [showMode, searchKeywords, searchData, foldingList.length]);

  const counter = useMemo(() => {
    return _.findIndex(
      listOptionEl.current,
      (info) => info.dataIndex === hoverIndex
    );
  }, [showMode, searchKeywords, searchData, hoverIndex, foldingList.length]);

  const focusIndex = useMemo(() => ({ current: counter }), [counter]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      return keyEventController(e, listOptionEl.current);
    };
    window.document.addEventListener("keydown", fn);

    return () => {
      window.document.removeEventListener("keydown", fn);
    };
  }, [showMode, searchKeywords, searchData, focusIndex, foldingList.length]);

  const keyEventController = (
    e: KeyboardEvent,
    optionOnShowList: { element: Element; dataIndex: number }[]
  ) => {
    const listOptionElement = listOptionEl.current;

    const maxCounter = listOptionElement.length - 1;

    const inputSearchBar = document.querySelector(
      '[data-hook="inputSearchBar"]'
    ) as HTMLInputElement;

    if (_.size(listOptionElement) > 0) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();

        if (e.key === "ArrowDown") {
          focusIndex.current >= maxCounter
            ? (focusIndex.current = 0)
            : focusIndex.current++;
        }

        if (e.key === "ArrowUp") {
          focusIndex.current === 0 || focusIndex.current < 0
            ? (focusIndex.current = maxCounter)
            : focusIndex.current--;
        }
        let index = focusIndex.current;
        let indexElementOnTarget = listOptionEl.current[index].dataIndex;

        const onFocusElement = document.querySelector(
          `[data-index="${indexElementOnTarget}"]`
        );
        const containerElement = containerRef.current;

        const elementBot = onFocusElement!.getBoundingClientRect().bottom;
        const elementTop = onFocusElement!.getBoundingClientRect().top;

        const containerBot = containerElement!.getBoundingClientRect().bottom;
        const containerTop = containerElement!.getBoundingClientRect().top;

        if (elementBot > containerBot) {
          onFocusElement!.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }

        if (elementTop < containerTop) {
          onFocusElement!.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }

        isOnSearch
          ? dispatch(setOptionOnFocus(index))
          : dispatch(setOptionOnFocus(indexElementOnTarget));
        inputSearchBar && inputSearchBar!.blur();
      }

      if (
        e.key === "Enter" &&
        focusIndex.current !== -1 &&
        searchMode === "offline"
      ) {
        e.preventDefault();
        let index = focusIndex.current;
        let indexElementOnTarget = optionOnShowList[index].dataIndex;

        const onFocusElement = document.querySelector(
          `[data-index="${indexElementOnTarget}"]`
        );

        if (index !== null) {
          if (e.shiftKey) {
            const isGroupOption = onFocusElement!.getAttribute("data-group");

            if (isGroupOption === "true" && showMode === "tree") {
              dispatch(setOptionsFolding(indexElementOnTarget));
            }
          } else {
            if (selectionMode === "multi") {
              dispatch(selectMultiOptions(indexElementOnTarget));
            }
            if (selectionMode === "single") {
              dispatch(selectSingleOption(indexElementOnTarget));
            }
            // dispatch(selectMultiOptions(indexElementOnTarget));
          }
        }
      }

      if (e.key === "Tab") {
        e.preventDefault();
        inputSearchBar && inputSearchBar.focus();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={classes.root}
      data-hook="selectContainer"
    >
      <OptionsListDataController
        showMode={showMode}
        searchMode={searchMode}
        isOnSearch={isOnSearch}
        selectionMode={selectionMode}
        defaultShowInfo={defaultShowInfo}
      />
    </div>
  );
};

export default OptionsListKeyController;
