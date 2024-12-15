import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import CommentForm from "./CommentForm/CommentForm";
import useTheme from "@/customHook/useTheme";
import CommentItem from "./CommentItem/CommentItem";

import styles from "./CommentList.module.scss";

const cx = classNames.bind(styles);

function CommentList({ data }) {
  const themeClassName = useTheme(cx);

  return (
    <>
      <ul className={cx("comment-site-nav", themeClassName)}>
        <li className={cx("active")}>
          <FontAwesomeIcon icon={faComment} className="mr4" />
          VietTruyen
        </li>
      </ul>

      <div className={cx("comment-wrapper")}>
        <CommentForm />

        <div className={cx("comment-list")}>
          {data.map((comment) => {
            return (
              <>
                <CommentItem data={comment} />
                {comment.replies &&
                  comment.replies.map((reply) => {
                    return <CommentItem data={reply} isReply />;
                  })}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

CommentList.propTypes = {
  data: PropTypes.array,
};
export default CommentList;
