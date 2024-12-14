import React from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import useTheme from "@/customHook/useTheme";
import styles from "./BreadCumb.module.scss";
import pathMappings from "./pathMappings";

const cx = classNames.bind(styles);
function BreadCumb({ comicName }) {
  const location = useLocation();
  const themeClassName = useTheme(cx);
  const { storyName, storyID, chap, userID, chapterID } = useParams();

  const pathname = location.pathname.split("/").filter((x) => x);
  
  const breadCumbItems = pathname.map((path, index) => {
    let routeTo = `/${pathname.slice(0, index + 1).join("/")}`;
    const isLast = index === pathname.length;

    let displayName = path;
    if (pathMappings[path]) {
      displayName = pathMappings[path].displayName;
      routeTo = pathMappings[path].routeTo || routeTo;
    } 
    else if (path === storyID) {
      displayName = null;
    } 
    else if (path === userID) {
      displayName = null;
    } 
    //comicName is props
    else if (path === storyName) {
      displayName = comicName;
      routeTo = `${routeTo}/${storyID}`;
    } 
    else if (path === chap) {
      displayName = chap.replace(/chap-(\d+)/i, "Chapter $1");
    }else if (path === chapterID){
      displayName = null;
    }

    return (
      <span key={path}>
        {!isLast ? (
          <>
            {displayName && (
              <>
                <FontAwesomeIcon icon={faAnglesRight} />
                <Link to={(displayName && displayName.includes("Chapter")) ? "" : routeTo}>
                  {displayName}
                </Link>
              </>
            )}
          </>
        ) : (
          <span>{displayName}</span>
        )}
      </span>
    );
  });

  return (
    <div className={`${cx("breadcumb")} ${themeClassName}`}>
      <Link to="/">Trang chủ</Link>
      {breadCumbItems}
    </div>
  );
}

BreadCumb.propTypes = {
  comicName: PropTypes.string,
}
export default BreadCumb;
