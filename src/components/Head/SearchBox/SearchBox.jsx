import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "./SearchBox.module.scss";
import SearchResult from "../SearchResult";

const cx = classNames.bind(styles);
const SearchBox = ({
  onBlur,
  onFocus,
  setSearchParam,
  searchParam,
  searchData,
  isSearchOpen,
  isLoading,
}) => {
  return (
    <div className={cx("search-box")}>
      <input
        placeholder="Tìm truyện..."
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
      />

      <button type="button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
      {isLoading && (
        <img
          className={cx("loading")}
          src="/images/loading/loading.gif"
          alt="loading"
        />
      )}

      {searchData.length !== 0 && isSearchOpen ? (
        <SearchResult searchData={searchData} />
      ) : null}
    </div>
  );
};

SearchBox.propTypes = {
  searchData: PropTypes.array.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  searchParam: PropTypes.string.isRequired,
  setSearchParam: PropTypes.func.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SearchBox;
