import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import styles from "./FilterButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const cx = classNames.bind(styles);

const FilterButton = ({
  pathName,
  search,
  activeNavLink,
  name,
  label,
  orangeActive,
  icon,
}) => {
  return (
    <button
      className={
        activeNavLink ? cx("filter-button") : cx("orange-filter-button")
      }
    >
      <NavLink
        className={`
            ${
              activeNavLink && activeNavLink === name ? cx("active") : ""
            }
            ${orangeActive && cx("orange-active")}
           `}
        to={{
          pathname: pathName,
          search: search,
        }}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
        {label}
      </NavLink>
    </button>
  );
};

FilterButton.propTypes = {
  name: PropTypes.string,
  pathName: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  activeNavLink: PropTypes.string,
  label: PropTypes.string.isRequired,
  orangeActive: PropTypes.bool,
  icon: PropTypes.object,
};

export default FilterButton;
