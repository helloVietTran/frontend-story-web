import React, { useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faHeart } from "@fortawesome/free-solid-svg-icons";

import styles from "./FollowAction.module.scss";
import { userApi } from "@/config/api";

const cx = classNames.bind(styles);

function FollowAction({ storyID, markedAsReadStory }) {
  const [isFollowed, setIsFollowed] = useState(true);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const handleFollowStory = async (id) => {
    try {
      await userApi.followStory(id);
      setIsFollowed(!isFollowed);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleUnFollowStory = async (id) => {
    try {
      await userApi.followStory(id);
      setIsFollowed(!isFollowed);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleMarkAsRead = async (storyID) => {
    try {
      await userApi.markAsRead(storyID);
      setDisabledBtn(true);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className={cx("follow-action")}>
      <Link
        className={`${cx("mark-as-read")} ${
          markedAsReadStory.includes(storyID) || disabledBtn ? "hidden" : ""
        }`}
        onClick={() => handleMarkAsRead(storyID)}
      >
        <FontAwesomeIcon icon={faCheck} />
        Đã đọc
      </Link>

      {isFollowed ? (
        <Link
          className={cx("unfollow")}
          onClick={() => handleUnFollowStory(storyID)}
        >
          <FontAwesomeIcon icon={faTimes} />
          Bỏ theo dõi
        </Link>
      ) : (
        <Link
          className={cx("follow")}
          onClick={() => handleFollowStory(storyID)}
        >
          <FontAwesomeIcon icon={faHeart} />
          Theo dõi
        </Link>
      )}
    </div>
  );
}

export default FollowAction;
