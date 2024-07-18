import React, { useEffect, useState } from "react";
import classname from "classnames/bind";
import { NavLink, useSearchParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import styles from "./Pagination.module.scss";
import useTheme from "../../customHook/useTheme";
import { storyApi } from "../../config/api";

const cx = classname.bind(styles);

function Pagination({ queryField }) {
  const themeClassName = useTheme(cx);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const [totalStories, setToTalStories] = useState(0);
  const storiesPerPage = 28;
  const pages = [];

  useEffect(() => {
    const fetchTotalStories = async () => {
      try {
        const res = await storyApi.getTotalStories(queryField);
        setToTalStories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchTotalStories();
  }, [queryField]);
  
  if (totalStories <= storiesPerPage) {
    return;
  }
  const totalPages = Math.ceil(totalStories / storiesPerPage);

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
            className={currentPage >= totalPages ? cx("disabled") : undefined}
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
