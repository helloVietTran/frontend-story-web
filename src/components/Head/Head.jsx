import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretDown,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import ThemeBox from "./ThemeBox/ThemeBox";
import SearchBox from "./SearchBox/SearchBox";
import Container from "../Layout/Container/Container";
import UserMenu from "../Menu/UserMenu/UserMenu";
import Logo from "./Logo/Logo";

import { logout } from "@/redux/authSlice";
import { toggleNavbar } from "@/redux/navbarSlice";
import { getMyInfo } from "@/api/userApi";
import styles from "./Head.module.scss";

const cx = classNames.bind(styles);

function Head() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.navbar);

  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  // call user api
  const { data : user} = useQuery({
    enabled: isAuthenticated,
    queryKey: ["userProfile"],
    queryFn: getMyInfo,
    staleTime: 5 * 60 * 1000,
    retryDelay: () => 3000
  })

  // xử lý rê chuột hiện dropdown menu
  const handleMouseEnterMenu = () => {
    setIsOpenUserMenu(true);
  };

  const handleMouseLeaveMenu = () => {
    setIsOpenUserMenu(false);
  };

  const handleClickUserMenu = () => {
    setIsOpenUserMenu(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsOpenUserMenu(false);
  };

  //open nav bar on mobile
  const handleOpenNavBar = () => {
    dispatch(toggleNavbar());
  };

  return (
    <header
      className={cx("header")}
      style={{ backgroundImage: "url(/images/back-ground/bg_head.jpg)" }}
    >
      <Container>
        <div className={cx("navbar")}>
          <Logo />

          <SearchBox
          
          />
          <ThemeBox />
          {!isAuthenticated ? (
            <ul className={cx("auth-menu", "sm-hide")}>
              <li>
                <Link to="/login" replace={true}>
                  Đăng nhập
                </Link>
              </li>
              /
              <li>
                <Link to="/register">Đăng ký</Link>
              </li>
            </ul>
          ) : (
            <div
              className={cx("user-menu", "sm-hide")}
              onMouseEnter={handleMouseEnterMenu}
              onMouseLeave={handleMouseLeaveMenu}
            >
              <img
                src={
                  user?.imgSrc ? user.imgSrc : "/images/anonymous/anonymous.png"
                }
                alt="avatar"
              />
              <span>Cá nhân</span>
              <FontAwesomeIcon icon={faCaretDown} />
              {isOpenUserMenu && (
                <UserMenu
                  handleClickUserMenu={handleClickUserMenu}
                  handleLogout={handleLogout}
                />
              )}
            </div>
          )}

          {/* đoạn code cho mobile */}
          <div className={cx("search-btn")} onClick={handleOpenNavBar}>
            <FontAwesomeIcon icon={faSearch} />
          </div>

          <div
            className={
              !isOpen ? cx("navBar-toggle") : cx("navBar-toggle", "open")
            }
            onClick={handleOpenNavBar}
          >
            <FontAwesomeIcon icon={!isOpen ? faBars : faTimes} />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Head;
