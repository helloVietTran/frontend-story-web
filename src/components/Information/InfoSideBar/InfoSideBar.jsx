import React from "react";
import classNames from "classnames/bind";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBook,
  faComment,
  faInfoCircle,
  faList,
  faLock,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { faCommentDots, faGaugeHigh } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import styles from "./InfoSideBar.module.scss";

const cx = classNames.bind(styles);
function InfoSideBar({ isHided }) {
  
  const location = useLocation();
  const getActivedClass = (path) => {
    path = "/secure" + path;
    return location.pathname === path ? cx("active") : "";
  };
  if (isHided) {
    return;
  }
  return (
    <ul className={cx("info-sidebar")}>
      <li className={getActivedClass("/dashboard")}>
        <NavLink to="dashboard " activeclassname={cx("active")}>
          <FontAwesomeIcon icon={faGaugeHigh} />
          <span className={"text"}>Thông tin chung</span>
        </NavLink>
      </li>
      <li className={getActivedClass("/user-profile")}>
        <NavLink to="user-profile" activeclassname={cx("active")}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Thông tin tài khoản
        </NavLink>
      </li>
      <li className={getActivedClass("/my-followed-comic")}>
        <NavLink to="my-followed-comic" activeclassname={cx("active")}>
          <FontAwesomeIcon icon={faBook} />
          Truyện theo dõi
        </NavLink>
      </li>
      <li className={getActivedClass("/user-point")}>
        <NavLink to="user-point" activeclassname={cx("active")}>
          <FontAwesomeIcon icon={faList} />
          Linh thạch
        </NavLink>
      </li>
      <li className={getActivedClass("/shop")}>
        <NavLink to="shop" activeclassname={cx("active")}>
          <FontAwesomeIcon icon={faBell} />
          Cửa hàng
        </NavLink>
      </li>

      <li className={getActivedClass("/my-comment")}>
        <NavLink to="my-comment" activeclassname={cx("active")}>
          <FontAwesomeIcon icon={faCommentDots} />
          Bình luận
        </NavLink>
      </li>

      <li className={getActivedClass("/notification")}>
        <NavLink to="notification" activeclassname={cx("active")}>
          <FontAwesomeIcon icon={faComment} />
          Thông báo
        </NavLink>
      </li>

      <li className={getActivedClass("/changing-password")}>
        <NavLink to="changing-password" activeclassname={cx("active")}>
          <FontAwesomeIcon icon={faLock} />
          Đổi mật khẩu
        </NavLink>
      </li>
      <li>
        <NavLink to="/">
          <FontAwesomeIcon icon={faSignOut} />
          Thoát
        </NavLink>
      </li>
    </ul>
  );
}

InfoSideBar.propTypes = {
  isHided: PropTypes.bool.isRequired,
};

export default InfoSideBar;
