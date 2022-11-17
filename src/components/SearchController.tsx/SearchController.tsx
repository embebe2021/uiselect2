import _ from "lodash";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { searchOffline, updateSearchResult } from "../../stores/ReduxStore";

const SearchController = (
  WrappedComponent: typeof React.Component
): React.ReactNode => {
  const Controller = (props: any): React.ReactNode => {
    const dispatch = useDispatch();

    const doSearchOnline = (searchValue?: any) => {
      axios
        .post("http://localhost:3005/data", {
          keywords: searchValue,
        })
        .then((response) => {
          dispatch(updateSearchResult(response.data));
        })
        .catch((err) => {
          dispatch(updateSearchResult([]));
        });
    };

    const doSearchOffline = (searchValue?: any) => {
      dispatch(searchOffline(searchValue));
    };

    return (
      <WrappedComponent
        {...props}
        doSearchOffline={doSearchOffline}
        doSearchOnline={doSearchOnline}
      />
    );
  };
  return Controller;
};

export default SearchController;
