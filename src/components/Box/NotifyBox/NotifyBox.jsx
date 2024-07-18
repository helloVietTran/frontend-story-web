import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./NotifyBox.module.scss";

const cx = classNames.bind(styles);

const NotifyBox = ({ content, color, bottom, top }) => {
  return (
  <p 
    className={cx('notify-box', color+"-box")}
    style={{marginBottom: bottom + 'px', marginTop: top+'px'}}
  >
    {content}
  </p>)
};

NotifyBox.propTypes = {
  content: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["red", "green"]).isRequired,
  bottom: PropTypes.number,
  top: PropTypes.number,
};

export default NotifyBox;
