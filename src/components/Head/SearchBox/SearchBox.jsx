import React, { useState, useRef } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";

import SearchResult from "../SearchResult/SearchResult";

import styles from "./SearchBox.module.scss";
import { searchStory } from "@/api/storyApi";
import createQueryFn from "@/utils/createQueryFn";

const cx = classNames.bind(styles);
const SearchBox = () => {
  const [searchParam, setSearchParam] = useState("");
  const [debouncedParam, setDebouncedParam] = useState(""); // delay call api
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const debounceTimeout = useRef(null);

  const { data: searchData, isLoading } = useQuery({
    enabled: debouncedParam?.length > 3,
    queryKey: ["searchStories", debouncedParam],
    queryFn: createQueryFn(searchStory),
    onError: (error) => {
      console.error("Error fetching stories:", error);
    },
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchParam(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedParam(value);
    }, 2000);
  };

  const handleBlurInput = () => {
    setIsSearchOpen(false);
  };

  const handleFocusInput = () => {
    setIsSearchOpen(true);
  };

  return (
    <div className={cx("search-box")}>
      <input
        placeholder="Tìm truyện..."
        value={searchParam}
        onChange={handleInputChange}
        onBlur={handleBlurInput}
        onFocus={handleFocusInput}
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

      {(searchData?.length > 0 && isSearchOpen) && (
        <SearchResult searchData={searchData} />
      )}
    </div>
  );
};

export default SearchBox;
