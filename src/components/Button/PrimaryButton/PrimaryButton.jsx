import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./PrimaryButton.module.scss";

const cx = classNames.bind(styles);

const PrimaryButton = ({
  title,
  color,
  icon,
  iconPosition,
  onClick,
  disabled,
  type,
  style,
}) => {
 
  return (
    <button
      style={style}
      type={type}
      className={`
            ${cx("btn", color)} ${disabled ? cx("disabled") : null}
        `}
      onClick={onClick}
    >
      {iconPosition === "left" && icon ? (
        <span className="mr4">
          <FontAwesomeIcon icon={icon} />
        </span>
      ) : null}
      {title}
      {iconPosition === "right" && icon ? (
        <span className="ml4">
          <FontAwesomeIcon icon={icon} />
        </span>
      ) : null}
    </button>
  );
};

PrimaryButton.propTypes = {
  color: PropTypes.oneOf(["green", "red", "yellow", "default", "blue"])
    .isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.object,
  iconPosition: PropTypes.oneOf(["right", "left"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  style: PropTypes.object,
};

export default PrimaryButton;
