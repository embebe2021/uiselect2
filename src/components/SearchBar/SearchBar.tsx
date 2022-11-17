import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchKeyword } from "../../stores/ReduxStore";
import type { RootState } from "../../stores/store";
import SearchController from "../SearchController.tsx/SearchController";
import { st, classes } from "./SearchBar.st.css";

type SearchBarProps = {
  searchMode?: "offline" | "online";
  setOnSearch: (value: boolean) => void;
  doSearchOffline: (val: string) => void;
  doSearchOnline: (val: string) => void;
};

const SearchBar = ({
  setOnSearch,
  searchMode = "offline",
  doSearchOffline,
  doSearchOnline,
}: SearchBarProps): React.ReactNode => {
  const { searchKeywords } = useSelector((state: RootState) => state.mainStore);

  const dispatch = useDispatch();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const text = target.value;
    if (text.length > 0) {
      setOnSearch(true);
    }
    if (text.length === 0) {
      setOnSearch(false);
    }
    dispatch(updateSearchKeyword(text));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      switch (searchMode) {
        case "offline": {
          doSearchOffline(searchKeywords);
          break;
        }
        case "online": {
          doSearchOnline(searchKeywords);
          break;
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchKeywords, searchMode]);

  return (
    <div data-hook="searchBar" className={classes.root}>
      <div className={classes.wrapper}>
        <input
          data-hook="inputSearchBar"
          placeholder={
            searchMode === "offline"
              ? 'Try "bags", "gear"...'
              : 'Try "fit", "man"...'
          }
          value={searchKeywords}
          className={classes.input}
          type="search"
          onChange={handleChange}
        />
        <div className={classes.iconWrapper}>
          <svg
            className={st(classes.icon, {
              isActive: searchKeywords.length > 0,
            })}
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchController(SearchBar);
