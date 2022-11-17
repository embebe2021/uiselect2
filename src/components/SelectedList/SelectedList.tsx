import _ from "lodash";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../stores/store";
import { clearAllSelected, selectMultiOptions } from "../../stores/ReduxStore";
import { st, classes } from "./SelectedList.st.css";

type SelectedListProps = {
  selectionMode?: "single" | "multi";
  searchMode?: "offline" | "online";
  showDropdown?: boolean;
  toggleDropdown: () => void;
};

const SelectedList = ({
  selectionMode = "single",
  searchMode = "offline",
  showDropdown = false,
  toggleDropdown,
}: SelectedListProps): JSX.Element => {
  const dispatch = useDispatch();

  const { data } = useSelector((root: RootState) => root.mainStore);
  const selectList = _.filter(data, (option) => option.selected);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ): void => {
    e.stopPropagation();

    dispatch(selectMultiOptions(index));
  };
  const handleDeselectAll = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.stopPropagation();

    dispatch(clearAllSelected());
  };

  return (
    <div
      className={classes.root}
      data-type="optionSelectList"
      data-hook="uiSelectList"
      onClick={() => toggleDropdown()}
    >
      <div
        data-hook="selectListContainer"
        className={classes.selectedContainer}
      >
        {_.size(selectList) > 0 ? (
          _.map(selectList, (option) => (
            <div key={nanoid()} className={classes.selectedWrapper}>
              <div className={classes.selectedLabel}>{option.data.label}</div>

              {selectionMode === "multi" && (
                <div
                  className={classes.selectedIconWrapper}
                  onClick={(e) => handleClick(e, option.index)}
                >
                  <svg className={classes.selectedIcon} viewBox="0 0 320 512">
                    <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                  </svg>
                </div>
              )}
            </div>
          ))
        ) : (
          <span className={classes.defaultText}>Select...</span>
        )}
      </div>
      {_.size(selectList) > 0 && selectionMode === "multi" && (
        <div
          data-hook="clearAllSelected"
          className={classes.clearSlected}
          onClick={handleDeselectAll}
        >
          <svg className={classes.clearSlectedIcon} viewBox="0 0 320 512">
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"></path>
          </svg>
        </div>
      )}

      <div
        className={st(classes.showDropdown, {
          isOpen: showDropdown,
          isClose: !showDropdown,
        })}
      >
        <svg className={classes.showDropdownIcon} viewBox="0 0 512 512">
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
        </svg>
      </div>
    </div>
  );
};

export default SelectedList;
