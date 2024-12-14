import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faHome, faSort } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import styles from "./NavBar.module.scss";
import Container from "../Layout/Container/Container";
import SortMenu from "../Menu/SortMenu/SortMenu";
import GenreMenu from "../Menu/GenreMenu/GenreMenu";

import useTheme from '@/customHook/useTheme';

const cx = classNames.bind(styles);
function NavBar({isPreventFixed}) {
  const themeClassName = useTheme(cx);

  const [isFixed, setIsFixed] = useState(false);
  const [isOpenGenreMenu, setIsOpenGenreMenu] = useState(false);
  const [isOpenSortMenu, setIsOpenSortMenu] = useState(false);

  useEffect(() => {
      if(isPreventFixed === undefined){
        const handleScroll = () => {
          const currentScrollPos = window.scrollY;
          const isFixed = currentScrollPos > 50;
          setIsFixed(isFixed);
      
        };
        window.addEventListener("scroll", handleScroll);
  
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }
    
  }, [isPreventFixed]);

  const checkLinkActive = ({ isActive }) =>
    isActive
      ? `${cx("active")} ${themeClassName} ${cx("nav-link")}`
      : `${themeClassName} ${cx("nav-link")}`;
      
  return (
    <nav
      className={`${cx("main-nav")} ${themeClassName} 
                  ${isFixed ? cx("fixed") : ""}
                  ${cx('sm-hide')}
                `}
    >
      <Container>
        <ul className={cx("nav-list")}>
          <li>
            <NavLink to="/" className={checkLinkActive}>
              <FontAwesomeIcon icon={faHome} className={cx("home-icon")} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/hot" className={checkLinkActive}>
              Hot
            </NavLink>
          </li>
          <li>
            <NavLink to="/following" className={checkLinkActive}>
              Theo dõi
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className={checkLinkActive}>
              Lịch sử
            </NavLink>
          </li>
          <li
            className={cx("dropdown-menu")}
            onMouseEnter={() => setIsOpenGenreMenu(true)}
            onClick={() => setIsOpenGenreMenu(!isOpenGenreMenu)}
            onMouseLeave={() => setIsOpenGenreMenu(false)}
          >
            <NavLink to="/find-story" className={checkLinkActive}>
              Thể loại
              <FontAwesomeIcon icon={faCaretDown} className={cx("down-icon")} />
            </NavLink>
            {isOpenGenreMenu && <GenreMenu />}
          </li>
          <li
            className={cx("dropdown-menu")}
            onMouseEnter={() => setIsOpenSortMenu(true)}
            onClick={() => setIsOpenSortMenu(!isOpenSortMenu)}
            onMouseLeave={() => setIsOpenSortMenu(false)}
          >
            <Link
              to="/find-story"
              className={`${themeClassName} ${cx("nav-link")}`}
            >
              Xếp hạng
              <FontAwesomeIcon icon={faSort} className={cx("sort-icon")} />
            </Link>
            {isOpenSortMenu && <SortMenu />}
          </li>
          <li>
            <NavLink to="/find-advanced" className={checkLinkActive}>
              Tìm truyện
            </NavLink>
          </li>

          <li >
            <NavLink to="/girl-story" className={checkLinkActive}>
              Con gái
            </NavLink>
          </li>

          <li>
            <NavLink to="/boy-story" className={checkLinkActive}>
              Con trai
            </NavLink>
          </li>
         
          <li className={cx('navBar-item', "md-hide")}>
              <Link
                className={`${themeClassName} ${cx("nav-link")}`}
                to="https://www.facebook.com/anh.tranviet.3386"
                target="_blank"
                
              >
                Group
              </Link>
            </li>
         
          <li className={cx('navBar-item', "md-hide")}>
              <Link
                className={`${themeClassName} ${cx("nav-link")}`}
                to="https://www.facebook.com/profile.php?id=61556648275676"
                target="_blank"
              >
                Fanpage
              </Link>
            </li>
        </ul>
        
      </Container>
    </nav>
  );
}

NavBar.propTypes = {
  isPreventFixed: PropTypes.bool,
}

export default NavBar

