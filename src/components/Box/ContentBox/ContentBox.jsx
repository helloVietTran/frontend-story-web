import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./ContentBox.module.scss";

const cx = classNames.bind(styles);

const ContentBox = ({ bodyContent }) => {
  return (
    <div className={cx("content-box")}>
      {bodyContent}
    </div>
  );
};

ContentBox.propTypes = {
  bodyContent: PropTypes.node.isRequired,
 
};
export default ContentBox;
