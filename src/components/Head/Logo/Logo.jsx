import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./Logo.module.scss";

const cx = classNames.bind(styles);

const Logo = () => {
  return (
    <div className={cx("brand")}>
      <Link className={cx("logo-link")} to="/">
        <img src="/images/logo/logo.png" alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
