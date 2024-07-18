import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./UserNav.module.scss";

import useTheme from "@/customHook/useTheme";
const cx = classNames.bind(styles);

const UserNav = ({ onClick, options, activeItem }) => {
  const themeClassName = useTheme(cx);

  return (
    <ul className={cx("user-nav")}>
      {options.map((option, index) => {
        let number = index + 1;
        return (
          <li
            key={option}
            className={
              activeItem === "option " + number ? cx("active") : undefined
            }
            onClick={()=> onClick('option ' + number)}
          >
            {option}
          </li>
        );
      })}
    </ul>
  );
};
UserNav.propTypes = {
  onClick: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default UserNav;
