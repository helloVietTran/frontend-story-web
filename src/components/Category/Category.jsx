import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import styles from "./Category.module.scss";
import useTheme from "@/customHook/useTheme";
import { options } from "@/config/filter";

const cx = classNames.bind(styles);

function Category({ setGenreParam }) {
  const location = useLocation();
  const themeClassName = useTheme(cx);

  useEffect(() => {
    if (location.pathname === "/find-story") setGenreParam("Tất cả");
    else
      options.forEach((genre) => {
        if (location.pathname.includes(genre.path.split("/")[2]))
          setGenreParam(genre.name);
      });
  }, [location, setGenreParam, options]);

  const checkLinkActive = ({ isActive }) => (isActive ? cx("active") : null);

  return (
    <>
      <div className={`${cx("category")} ${themeClassName}`}>
        <h2>Thể loại</h2>
        <ul className={cx("category-list")}>
          {options.map((genre) => {
            return (
              <li key={genre.id}>
                <NavLink to={genre.path} className={checkLinkActive}>
                  {genre.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Category;
