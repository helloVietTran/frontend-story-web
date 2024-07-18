import React from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import styles from "./Container.module.scss";

const cx = classNames.bind(styles);

const Container = ({
  children,
  isBackgroundVisible,
  shouldApplyPadding,
  backgroundColor,
  fill
}) => {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const backGround = darkTheme ? "dark-backGround" : "backGround";
  return (
    <div
      className={`${cx("container")} 
        ${isBackgroundVisible && cx(backGround)}
        ${shouldApplyPadding && cx("pad-y-15")}
        ${fill && cx('fill')}
        `}
      style={{backgroundColor: backgroundColor}}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  isBackgroundVisible: PropTypes.bool,
  shouldApplyPadding: PropTypes.bool,
  backgroundColor: PropTypes.string,
  fill: PropTypes.bool,
};

export default Container;
