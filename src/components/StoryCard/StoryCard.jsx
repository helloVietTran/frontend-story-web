import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import styles from "./StoryCard.module.scss";
import useTheme from "../../customHook/useTheme";
import FollowAction from "../FollowAction";
import calculateTime from "../../utils/calculateTime";
import formatNumber from "../../utils/formatNumber";

const cx = classNames.bind(styles);

function StoryCard({ item, followAction, markedAsReadStory }) {
  const themeClassName = useTheme(cx);

  return (
    <div className={`${cx("card-item")}`}>

      <div className={cx("card-body")}>
        <Link to={`/story/${item.slug}/${item._id}`}>
          {item.hot && <span className="icon-hot"></span>}
          <img className={cx("card-img")} src={item.imgSrc} alt="story-img" />
        </Link>

        <div className={cx("card-info")}>

          <div className={cx("group")}>
            <FontAwesomeIcon icon={faEye} className={cx("icon")} />
            <span>{formatNumber(item.viewCount)}</span>
          </div>

          <div className={cx("group")}>
            <FontAwesomeIcon icon={faComment} className={cx("icon")} />
            <span>{formatNumber(item.commentCount)}</span>
          </div>
          
          <div className={cx("group")}>
            <FontAwesomeIcon icon={faHeart} className={cx("icon")} />
            <span>{formatNumber(item.follower)}</span>
          </div>
        </div>
      </div>

      {followAction && (
        <FollowAction
          storyID={item._id}
          markedAsReadStory={markedAsReadStory}
        />
      )}
       <Link to={`/story/${item.slug}/${item._id}`} className={cx("name")}>
          {item.name}
        </Link>
      <ul className={`${cx("chapter-list")} ${themeClassName}`}>
        {
          Object.entries(item.chapters).reverse().slice(-3).map(([key, value]) => {
            return(
              <li
                className={`${cx("chapter-link")} ${
                    true
                    ? cx("read")
                    : cx("unread")
                }`}
                key={key}
              >
                <Link
                  to={`/story/${item.slug}/${item._id}/${value.chap}`}
                >
                  Chap {value.chap.slice(5)}
                </Link>
                <span className={cx("update")}>
                  {calculateTime(value.createdAt)}
                </span>
              </li>
            )
          })
        }
        
      </ul>
    </div>
  );
}

StoryCard.propTypes = {
  item : PropTypes.object.isRequired,
  followAction: PropTypes.func,
  markedAsReadStory: PropTypes.func
}
export default StoryCard;

