import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./SecondaryHeading.module.scss";
import useTheme from "../../../customHook/useTheme";

const cx = classNames.bind(styles);

const SecondaryHeading = ({ title, size, top, bottom }) => {
  const themeClassName = useTheme(cx);
  return (
    <div
      className={cx("secondary-heading", themeClassName)}
      style={{ marginBottom: bottom + "px", marginTop: top + "px" }}
    >
      <h3 style={{ fontSize: size + "rem" }} className={cx('heading')}>
        {title}
    </h3>
    </div>
  );
};

SecondaryHeading.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  top: PropTypes.number,
  bottom: PropTypes.number,
};

export default SecondaryHeading;
