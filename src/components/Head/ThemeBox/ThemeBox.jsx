import React from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import styles from "./ThemeBox.module.scss";
import { toggleTheme } from "@/redux/themeSlice";

const cx = classNames.bind(styles);

const ThemeBox = () => {
    const dispatch = useDispatch();
    const darkTheme = useSelector((state) => state.theme.darkTheme);

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

  return (
    <div className={cx("theme-box")}>
      <Link onClick={handleToggleTheme}>
        <FontAwesomeIcon
          icon={faLightbulb}
          className={darkTheme ? cx("toggle-theme-btn", "dark") : cx("toggle-theme-btn")}
        />
      </Link>
    </div>
  );
};

export default ThemeBox;
