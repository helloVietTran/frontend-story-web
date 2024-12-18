import React from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTimes } from "@fortawesome/free-solid-svg-icons";

import styles from "./PrimaryListItem.module.scss";
import useTheme from "@/customHook/useTheme";

const cx = classNames.bind(styles);

const PrimaryListItem = ({
  data,
  hasDeleteBtn,
  hasViewCount,
  handleDeleteReadingHistory,
}) => {
  const themeClassName = useTheme(cx);

  return (
    <div className={cx("primary-list-item", themeClassName)}>
      <Link to={`/story/${data.slug}/${data.id}`}>
        <img alt="list" className={cx("image")} src={data.imgSrc} />
      </Link>
      <div className={cx("body")}>
        <Link to={`/story/${data.slug}/${data.id}`} className={cx("name")}>
          <h3>{data.name}</h3>
        </Link>
        <div className={cx("chapter")}>
          <Link
            to={`/story/${data.slug}/${data.id}/chap-${data.newestChapter}`}
            className={cx("chap")}
          >
            <span className={hasDeleteBtn ? cx("read") : ""}>
              Chap{" "}
              {!hasDeleteBtn
                ? data.newestChapter
                : Math.max(...data.chaptersRead)}
            </span>
          </Link>
          {!hasDeleteBtn && !hasViewCount && (
            <time>{data.updatedAt}</time>
          )}
          {hasDeleteBtn && (
            <Link
              className={cx("delete-btn")}
              onClick={() => handleDeleteReadingHistory(data.id)}
            >
              <FontAwesomeIcon icon={faTimes} />
              Xóa
            </Link>
          )}
          {hasViewCount && (
            <span className={cx("view")}>
              <FontAwesomeIcon icon={faEye} />
              {data.viewCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
PrimaryListItem.propTypes = {
  data: PropTypes.object.isRequired,
  hasDeleteBtn: PropTypes.bool,
  hasViewCount: PropTypes.bool,
  handleDeleteReadingHistory: PropTypes.func,
};
export default PrimaryListItem;
