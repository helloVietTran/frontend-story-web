import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./SearchResult.module.scss";

const cx = classNames.bind(styles);
function SearchResult({ searchData }) {

  const handleMouseDown = (e) => {
    e.preventDefault();
  }
  return (
    <div className={cx("suggest-search")}>
      <ul>
        {searchData.map((searchValue) => {
          return (
            <li key={searchValue._id} onMouseDown={handleMouseDown}>
              <Link to={`/story/${searchValue.slug}/${searchValue._id}`}>
                <img className={cx("story-logo")} src={searchValue.imgSrc} alt="search"/>
                <div className={cx("info")}>
                  <h3>{searchValue.name}</h3>
                  <i className={cx("last-chapter")}>
                    Chapter {searchValue.newestChapter}
                  </i>
                  {searchValue.author !== "" ? <b>{searchValue.author}</b> : null}
                  <p>{searchValue.genres.join(", ")}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchResult;
