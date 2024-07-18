import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faLightbulb,
  faCaretDown,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Head.module.scss";
import classNames from "classnames/bind";
import SearchBox from "./SearchBox";
import { toggleNavbar } from "@/actions/navbar";
import { logout } from "@/actions/auth";
import { storyApi } from "@/config/api";
import { UserMenu } from "../Menu";
import { Container } from "../Layout";

const cx = classNames.bind(styles);
function Head() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.navbar);

  const [searchParam, setSearchParam] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  const darkTheme = useSelector((state) => state.theme.darkTheme);

  //search
  useEffect(() => {
    let delayCallApi;

    const fetchData = async () => {
      try {
        setIsloading(true);
        const res = await storyApi.searchStory(searchParam);
        setIsloading(false);
        setSearchData(res.data);
      } catch (err) {
        setIsloading(false);
        console.log(err);
      }
    };

    const handleDelay = () => {
      clearTimeout(delayCallApi);
      delayCallApi = setTimeout(() => {
        fetchData();
      }, 500);
    };
    if (searchParam.length >= 3) {
      handleDelay();
    }
    return () => {
      clearTimeout(delayCallApi);
    };
  }, [searchParam]);

  const handleBlurInput = () => {
    setIsSearchOpen(false);
  };

  const handleFocusInput = () => {
    setIsSearchOpen(true);
  };

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };
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
    dispatch(logout())
    setIsOpenUserMenu(false);
  };
  //nav bar mobile
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
          <div className={cx("navbar-brand")}>
            <Link className={cx("logo-link")} to="/">
              <img src="/images/logo/logo-nettruyen.png" alt="logo" />
            </Link>
          </div>

          <SearchBox
            onBlur={handleBlurInput}
            onFocus={handleFocusInput}
            searchData={searchData}
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            isSearchOpen={isSearchOpen}
            isLoading={isLoading}
          />

          <div className={cx("icon-box")}>
            <Link onClick={toggleTheme}>
              <FontAwesomeIcon
                icon={faLightbulb}
                className={
                  darkTheme ? cx("toggle-btn", "dark") : cx("toggle-btn")
                }
              />
            </Link>
          </div>

          {!isAuthenticated ? (
            <ul className={cx("account-nav", "sm-hide")}>
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
              className={cx("user-nav", "sm-hide")}
              onMouseEnter={handleMouseEnterMenu}
              onMouseLeave={handleMouseLeaveMenu}
            >
              <img
                src={
                  user?.imgSrc
                    ? user.imgSrc
                    : "/images/anonymous/anonymous.png"
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
