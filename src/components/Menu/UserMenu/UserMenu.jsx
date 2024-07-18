import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faSignOut } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./UserMenu.module.scss";

const cx = classNames.bind(styles);

const UserMenu = ({
    handleClickUserMenu, handleLogout, textColor
}) => {
  return (
    <ul className={cx("user-menu")}>
      <li>
        <Link to="/secure/dashboard" onClick={handleClickUserMenu} style={{color: textColor}}>
          <FontAwesomeIcon icon={faUser} />
          Trang cá nhân
        </Link>
      </li>
      <li>
        <Link to="/secure/comicFollowed" onClick={handleClickUserMenu} style={{color: textColor}}>
          <FontAwesomeIcon icon={faBook} />
          Truyện theo dõi
        </Link>
      </li>
      <li>
        <Link onClick={handleLogout} style={{color: textColor}}>
          <FontAwesomeIcon icon={faSignOut} />
          Đăng xuất
        </Link>
      </li>
    </ul>
  );
};

UserMenu.propTypes = {
  handleClickUserMenu: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  textColor: PropTypes.string,
}

export default UserMenu;
