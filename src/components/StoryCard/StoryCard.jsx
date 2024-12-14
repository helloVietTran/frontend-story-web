import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import FollowAction from "../FollowAction/FollowAction";

import styles from "./StoryCard.module.scss";
import useTheme from "@/customHook/useTheme";
import formatNumber from "@/utils/formatNumber";

const cx = classNames.bind(styles);

function StoryCard({ data, followAction, markedAsReadStory }) {
  const themeClassName = useTheme(cx);
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

      {followAction && (
        <FollowAction
          storyID={data._id}
          markedAsReadStory={markedAsReadStory}
        />
      )}

      <Link to={`/story/${data.slug}/${data.id}`} className={cx("name")}>
        {data.name}
      </Link>

      <ul className={`${cx("chapter-list")} ${themeClassName}`}>
        {data.chapters ? (
          data.chapters.map((chapter) => {
            return (
              <li className={cx("chapter-link")} key={chapter.id}>
                <Link to={`/story/${data.slug}/${data.id}/${chapter.slug}`}>
                  Chap {chapter.chap}
                </Link>
                <span className={cx("update")}>{chapter.createdAt}</span>
              </li>
            );
          })
        ) : (
          <>
            <li className={cx("chapter-link")}>
              <Link
                to={`/story/${data.slug}/${data.id}/chap-${data.newestChapter}`}
              >
                Chap {data.newestChapter}
              </Link>
            </li>
            <li className={cx("chapter-link")}>
              <Link
                to={`/story/${data.slug}/${data.id}/chap-${
                  data.newestChapter - 1
                }`}
              >
                Chap {data.newestChapter - 1}
              </Link>
            </li>
            <li className={cx("chapter-link")}>
              <Link
                to={`/story/${data.slug}/${data.id}/chap-${
                  data.newestChapter - 2
                }`}
              >
                Chap {data.newestChapter - 2}
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

StoryCard.propTypes = {
  item: PropTypes.object.isRequired,
  followAction: PropTypes.func,
  markedAsReadStory: PropTypes.func,
};
export default StoryCard;

/* chapterList.map( (chapter, index) => {
            return
            (
              <li
                className={`${cx("chapter-link")} ${
                    true
                    ? cx("read")
                    : cx("unread")
                }`}
                key={index}
              >
                
            )
          }) */
