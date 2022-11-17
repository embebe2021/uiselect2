import "../../globals.st.css";
import { useEffect, useRef, useState } from "react";
import ButtonDone from "../ButtonDone";
import OptionsListKeyController from "../OptionsListKeyController";
import SelectedList from "../SelectedList";
import SearchBar from "../SearchBar";
import { classes } from "./UISelect.st.css";

type UISelectProps = {
  defaultShowMode?: "single" | "tree" | "optgroup";
  defaultSelectionMode?: "single" | "multi";
  defaultSearchMode?: "offline" | "online";
  defaultDropDownOpen?: boolean;
  defaultShowInfo?: boolean;
};

const UISelect = ({
  defaultShowMode = "single",
  defaultSelectionMode = "single",
  defaultSearchMode = "offline",
  defaultDropDownOpen = false,
  defaultShowInfo = false,
}: UISelectProps) => {
  const uiRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(defaultDropDownOpen);
  const [onSearch, setOnSearch] = useState(false);

  useEffect(() => {
    const clickOutControl = (e: MouseEvent): void => {
      if (uiRef.current && !uiRef.current.contains(e.target as Element))
        handleShowDropdown();
    };
    document.addEventListener("click", clickOutControl);
    return () => document.removeEventListener("click", clickOutControl);
  }, []);

  const handleShowDropdown = (): void => {
    setShowDropdown(!showDropdown);
    setOnSearch(false);
  };

  return (
    <div data-hook="uiSelectWrapper" className={classes.root} ref={uiRef}>
      <SelectedList
        selectionMode={defaultSelectionMode}
        searchMode={defaultSearchMode}
        toggleDropdown={handleShowDropdown}
        showDropdown={showDropdown}
      />
      {showDropdown && (
        <div data-hook="dropdownWrapper" className={classes.dropdownWrapper}>
          <SearchBar setOnSearch={setOnSearch} searchMode={defaultSearchMode} />
          <OptionsListKeyController
            showMode={defaultShowMode}
            selectionMode={defaultSelectionMode}
            isOnSearch={onSearch}
            searchMode={defaultSearchMode}
            defaultShowInfo={defaultShowInfo}
          />
          <ButtonDone toggleDropdown={handleShowDropdown} />
        </div>
      )}
    </div>
  );
};

export default UISelect;
