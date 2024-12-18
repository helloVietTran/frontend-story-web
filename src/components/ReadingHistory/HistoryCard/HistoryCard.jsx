import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import styles from "./HistoryCard.module.scss";
import useTheme from "@/customHook/useTheme";

const cx = classNames.bind(styles);

function HistoryCard({ data, handleDeleteReadingHistory }) {
  const themeClassName = useTheme(cx);
  return (
    <div className={`${cx("card-item")}`}>
      <div className={cx("card-body")}>
        <Link to={`/story/${data.slug || data.story.slug}/${data.id ||data.story.id}`}>
          <img className={cx("card-img")} src={data.imgSrc || data.story.imgSrc} alt="story-img" />
        </Link>
        <div className={cx("delete-btn")}>
          <span onClick={() => handleDeleteReadingHistory(data.id)}>
            <FontAwesomeIcon icon={faTimes} />
            Xóa
          </span>
        </div>
      </div>

      <div className={`${cx("chapter-list")} ${themeClassName}`}>
        <Link to={`/story/${data.slug || data.story.slug}/${data.id ||data.story.id}`} className={cx("name")}>
          {data.name}
        </Link>
        <Link
          to={`/story/${data.slug || data.story.slug}/${data.id ||data.story.id}/chap-${Math.max(
            ...data.chaptersRead
          )}`}
          className={cx("last-read")}
        >
          Đọc tiếp Chapter {Math.max(...data.chaptersRead)}
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </div>
    </div>
  );
}

HistoryCard.propTypes = {
  data: PropTypes.object.isRequired,
  handleDeleteReadingHistory: PropTypes.func.isRequired
};

export default HistoryCard;
