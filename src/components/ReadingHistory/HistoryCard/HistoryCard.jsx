import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faTimes,
  faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import styles from "./HistoryCard.module.scss";
import useTheme from "../../../customHook/useTheme";
import { readingStoryApi } from "../../../config/api";
import handleDeleteFromLocalStorage from "../../../utils/deleteLocalHistory";

const cx = classNames.bind(styles);

function HistoryCard({ item, activeItem, setReadingHistoryData }) {
  const themeClassName = useTheme(cx);
  const [toggleBtn, setToggleBtn] = useState(true);

  const handleDeleteReadingHistory = async (id) => {
    try {
      if (activeItem === "item1") {
        handleDeleteFromLocalStorage(id, setReadingHistoryData);
      } else {
        await readingStoryApi.deleteHistory(id);
        setToggleBtn(false);
      }
    } catch (error) {
      console.log(error);
    }
    
  };
  const handleAddToReadingHistory = async (story) => {
    const visited_story = {
      _id: story._id,
      name: story.name,
      slug: story.slug,
      url: story.url,
      chap: story.chapter,
    };
  
    try {
      await readingStoryApi.addHistory(visited_story);
      setToggleBtn(true);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className={`${cx("card-item")}`}>
      <div className={cx("card-body")}>
        <Link to={`/story/${item.slug}/${item._id}`}>
          <img className={cx("card-img")} src={item.url} alt="story-img" />
        </Link>
        <div className={cx("delete-btn")}>
          {toggleBtn ? (
            <Link onClick={() => handleDeleteReadingHistory(item._id)}>
              <FontAwesomeIcon icon={faTimes} />
              Xóa
            </Link>
          ) : (
            <Link onClick={() => handleAddToReadingHistory(item)}>
              <FontAwesomeIcon icon={faArrowRotateLeft} />
              Hoàn tác
            </Link>
          )}
        </div>
      </div>

      <div className={`${cx("chapter-list")} ${themeClassName}`}>
        <Link to={`/story/${item.slug}/${item._id}`} className={cx("name")}>
          {item.name}
        </Link>
        <Link
          to={`/story/${item.slug}/${item._id}/chap-${item.chapter}`}
          className={cx("last-read")}
        >
          Đọc tiếp Chapter {item.chapter}
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </div>
    </div>
  );
}

HistoryCard.propTypes = {
  activeItem: PropTypes.string.isRequired,
  item : PropTypes.string.isRequired,
  setReadingHistoryData : PropTypes.func.isRequired,
}

export default HistoryCard;
