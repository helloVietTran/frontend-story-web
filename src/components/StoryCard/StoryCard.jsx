import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import styles from "./StoryCard.module.scss";
import useTheme from "@/customHook/useTheme";
import formatNumber from "@/utils/formatNumber";

const cx = classNames.bind(styles);

function StoryCard({ data, readingHistoryData }) {
  const themeClassName = useTheme(cx);

  const hasReadChapter = useMemo(
    () => (storyId, chapter) => {
      if (!readingHistoryData) return false;
      return readingHistoryData.some(
        (item) => item.id === storyId && item.chaptersRead.includes(chapter)
      );
    },
    [readingHistoryData]
  );
  return (
    <div className={`${cx("card-item")}`}>
      <div className={cx("card-body")}>
        <Link to={`/story/${data.slug}/${data.id}`}>
          {data.hot && <span className="icon-hot"></span>}
          <img className={cx("card-img")} src={data.imgSrc} alt="story-img" />
        </Link>

        <div className={cx("card-info")}>
          <div className={cx("group")}>
            <FontAwesomeIcon icon={faEye} className={cx("icon")} />
            <span>{formatNumber(data.viewCount)}</span>
          </div>

          <div className={cx("group")}>
            <FontAwesomeIcon icon={faComment} className={cx("icon")} />
            <span>{formatNumber(data.commentCount)}</span>
          </div>

          <div className={cx("group")}>
            <FontAwesomeIcon icon={faHeart} className={cx("icon")} />
            <span>{formatNumber(data.follower)}</span>
          </div>
        </div>
      </div>

      <Link
        to={`/story/${data.slug}/${data.id}`}
        className={`${cx("name")} ${themeClassName}`}
      >
        {data.name}
      </Link>

      <ul className={`${cx("chapter-list")} ${themeClassName}`}>
        {data.chapters ? (
          data.chapters.map((chapter) => {
            return (
              <li
                className={
                  hasReadChapter(data.id, chapter.chap)
                    ? cx("chapter-link", "read")
                    : cx("chapter-link")
                }
                key={chapter.id}
              >
                <Link to={`/story/${data.slug}/${data.id}/${chapter.slug}`}>
                  Chap {chapter.chap}
                </Link>
                <span className={cx("update")}>{chapter.createdAt}</span>
              </li>
            );
          })
        ) : (
          <li
            className={
              hasReadChapter(data.id, data.newestChapter)
                ? cx("chapter-link", "read")
                : cx("chapter-link")
            }
            key={data.newestChapter}
          >
            <span>Chap mới nhất</span> 
            <Link
              to={`/story/${data.slug}/${data.id}/chap-${data.newestChapter}`}
            >
              Chapter {data.newestChapter}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

StoryCard.propTypes = {
  data: PropTypes.object.isRequired,
  readingHistoryData: PropTypes.array,
};
export default StoryCard;
