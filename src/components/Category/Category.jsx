import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { v4 as uuidv4 } from "uuid";

import styles from "./Category.module.scss";
import { options } from "../../config/filter";
import useTheme from "../../customHook/useTheme";

const cx = classNames.bind(styles);

function Category({ setGenreParam }) {
  const location = useLocation();
  const themeClassName = useTheme(cx);
  useEffect(() => {
    if (location.pathname === "/find-story") {
      setGenreParam("Tất cả");
    } else {
      options.forEach((option) => {
        if (location.pathname.includes(option.path.split("/")[2])) {
          setGenreParam(option.name);
        }
      });
    }
  }, [location, setGenreParam]);

  const checkLinkActive = ({ isActive }) => (isActive ? cx("active") : null);
  return (
    <>
      <div className={`${cx("category")} ${themeClassName}`}>
        <h2 >Thể loại</h2>
        <ul className={cx("category-list")}>
          {options.map((item) => {
            return (
              <li key={uuidv4()}>
                <NavLink to={item.path} className={checkLinkActive}>
                  {item.name}
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
