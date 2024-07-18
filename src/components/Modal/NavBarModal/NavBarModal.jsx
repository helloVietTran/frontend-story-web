import React, { useState } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faSearch,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import styles from "./NavBarModal.module.scss";
import { closeNavbar } from "@/actions/navbar";
//import { logoutAction } from "@/actions/auth";
import { GenreMenu, SortMenu } from "@/components/Menu";
import { UserMenu } from "@/components/Menu";

const cx = classNames.bind(styles);

const NavBarModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, userData } = useSelector((state) => state.auth);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [isOpenGenreMenu, setIsOpenGenreMenu] = useState(false);
  const [isOpenSortMenu, setIsOpenSortMenu] = useState(false);

  const handleClose = () => {
    dispatch(closeNavbar());
  };

  const handleLogout = () => {
    setIsOpenUserMenu(false);
    Cookies.remove("jwt");
   // dispatch(logoutAction());
  };

  const handleClickUserMenu = () => {
    setIsOpenUserMenu(false);
    dispatch(closeNavbar());
  };

  const handleMouseEnterMenu = () => {
    setIsOpenUserMenu(true);
  };

  const handleMouseLeaveMenu = () => {
    setIsOpenUserMenu(false);
  };

  const handleSearch = () => {
    navigate(`/find-story?keyword=${searchValue}`);
    dispatch(closeNavbar());
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/find-story?keyword=${searchValue}`);
      dispatch(closeNavbar());
    }
    return;
  };

  return (
    <div className={cx("navbar-modal")}>
      <div className={cx("search-box")}>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm truyện ..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" 
          onClick={handleSearch} 
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <ul className={cx("main-menu")}>
        <li className={cx("active")}>
          <Link to="/" onClick={handleClose}>
            Trang chủ
          </Link>
        </li>
        <li>
          <Link to="/hot" onClick={handleClose}>
            Hot
          </Link>
        </li>
        <li>
          <Link to="/history" onClick={handleClose}>
            Lịch sử
          </Link>
        </li>
        <li>
          <Link to="/following" onClick={handleClose}>
            Theo dõi
          </Link>
        </li>

        <li
          className={cx("dropdown-menu")}
          onMouseEnter={() => setIsOpenGenreMenu(true)}
          onClick={() => setIsOpenGenreMenu(!isOpenGenreMenu)}
          onMouseLeave={() => setIsOpenGenreMenu(false)}
        >
          <Link to="/find-story" onClick={handleClose}>
            Thể loại
            <FontAwesomeIcon icon={faCaretDown} />
          </Link>
          {isOpenGenreMenu && <GenreMenu />}
        </li>

        <li
          className={cx("dropdown-menu")}
          onMouseEnter={() => setIsOpenSortMenu(true)}
          onClick={() => setIsOpenSortMenu(!isOpenSortMenu)}
          onMouseLeave={() => setIsOpenSortMenu(false)}
        >
          <Link to="" onClick={handleClose}>
            Xếp hạng
            <FontAwesomeIcon icon={faSort} />
          </Link>
          {isOpenSortMenu && <SortMenu />}
        </li>

        <li>
          <Link to="/girl-story" onClick={handleClose}>
            Con gái
          </Link>
        </li>
        <li>
          <Link to="/boy-story" onClick={handleClose}>
            Con trai
          </Link>
        </li>
        <li>
          <Link to="https://www.facebook.com/anh.tranviet.3386" target="_blank">
            Group
          </Link>
        </li>
        <li>
          <Link
            to="https://www.facebook.com/profile.php?id=61556648275676"
            target="_blank"
          >
            FanPage
          </Link>
        </li>

        {isLoggedIn ? (
          <li
            className={cx("user-nav")}
            onMouseEnter={handleMouseEnterMenu}
            onMouseLeave={handleMouseLeaveMenu}
          >
            <img
              src={
                userData?.avatar
                  ? userData.avatar
                  : "/images/anonymous/anonymous.png"
              }
              alt="avatar"
            />
            <span>Cá nhân</span>
            <FontAwesomeIcon icon={faCaretDown} />

            {isOpenUserMenu && (
              <UserMenu
                handleLogout={handleLogout}
                handleClickUserMenu={handleClickUserMenu}
                textColor="#333"
              />
            )}
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={handleClose}>
                Đăng nhập
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={handleClose}>
                Đăng kí
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

NavBarModal.propTypes = {};

export default NavBarModal;
