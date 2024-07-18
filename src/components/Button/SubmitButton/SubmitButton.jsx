import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import styles from "./SubmitButton.module.scss";

const cx = classNames.bind(styles);

const SubmitButton = ({ type, title }) => {
  return (
    <button type="submit" className={cx("btn", type)}>
      {type === "google" && (
        <FontAwesomeIcon icon={faGoogle} className={cx("google-icon")} />
      )}
      {title}
    </button>
  );
};
SubmitButton.propTypes = {
  type: PropTypes.oneOf(["normal", "google"]),
  title: PropTypes.string.isRequired,
};
export default SubmitButton;
