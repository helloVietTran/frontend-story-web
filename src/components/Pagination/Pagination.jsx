import React from "react";
import classname from "classnames/bind";
import { NavLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import styles from "./Pagination.module.scss";
import useTheme from "../../customHook/useTheme";

const cx = classname.bind(styles);

function Pagination({ data }) {
  const themeClassName = useTheme(cx);
  const navigate = useNavigate();

  if(!data){
    return;
  }
  // lấy từ data
  const totalStories  = data.totalElements;
  const totalPages = data.totalPages;
  const currentPage = data.currentPage;
  const storiesPerPage = 32;
  const pages = [];

  if (totalStories <= storiesPerPage) {
    return;
  }

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const goToNextPage = () => {
    navigate(`?page=${currentPage + 1}`);
  };
  const goToPrevPage = () => {
    navigate(`?page=${currentPage - 1}`);
  };

  return (
    <div className={`${cx("pagination-outer")} ${themeClassName}`}>
      <ul className={cx("pagination")}>
        <li className={cx("page-item")}>
          <span
            className={currentPage <= 1 ? cx("disabled") : undefined}
            onClick={() => goToPrevPage()}
          >
            ‹
          </span>
        </li>

        {pages.map((number) => {
          return (
            <li className={cx("page-item")} key={uuidv4()}>
              <NavLink
                to={`?page=${number}`}
                className={currentPage === number ? cx("active") : null}
              >
                {number}
              </NavLink>
            </li>
          );
        })}

        <li className={cx("page-item")}>
          <span
            className={currentPage >= totalPages ? cx("disabled") : null}
            onClick={() => goToNextPage()}
          >
            ›
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
