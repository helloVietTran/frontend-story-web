import React, { useState, useEffect } from "react";
import {
  faAngleLeft,
  faAngleUp,
  faComment,
  faMailForward,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link, useParams, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import LevelBox from "@/components/Box/LevelBox/LevelBox";

import styles from "./CommentItem.module.scss";
import useTheme from "@/customHook/useTheme";
import CommentForm from "../CommentForm/CommentForm";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dislikeComment, likeComment } from "@/api/reactionApi";
import connectWebSocket from "@/utils/connectWebsocket";

const cx = classNames.bind(styles);

const CommentItem = ({ data: comment, isReply = false }) => {
  const themeClassName = useTheme(cx);
 // const queryClient = useQueryClient();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [openCommentForms, setOpenCommentForms] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const queryClient = useQueryClient();

  const {storyID} = useParams();
  const [searchParams] = useSearchParams();
  
    const page = searchParams.get("page") || 1;

  const handleReplyClick = (commentId) => {
    setOpenCommentForms((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const handleCloseForm = (commentId) => {
    setOpenCommentForms((prevState) => ({
      ...prevState,
      [commentId]: false,
    }));
  };

  const style = {
    fontSize: "14px",
  };
  // real time
 /** useEffect(() => {
    const channels = [
      `/topic/comments/${comment.id}/likes`,
      `/topic/comments/${comment.id}/dislikes`,
    ];

    const client = connectWebSocket(channels, (channel, data) => {
      if (channel === `/topic/comments/${comment.id}/likes`) setLikeCount(data);
      else if (channel === `/topic/comments/${comment.id}/dislikes`)
        setDislikeCount(data);
    });

    client.onConnect = () => {
      console.log("WebSocket đã kết nối thành công!");
    };
  
    client.onStompError = (frame) => {
      console.error("Lỗi WebSocket:", frame);
    };
    return () => client.deactivate();
  }, [comment.id]); */

  // define mutation
  const likeMutation = useMutation({
    mutationFn: likeComment,
    onSuccess: () => {
      queryClient.invalidateQueries( ["storyComments", storyID, page]);
    },
    onError: () => {
      toast.error("Vui lòng thử lại sau!", {
        style,
      });
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: dislikeComment,
    onSuccess: () => {
      queryClient.invalidateQueries( ["storyComments", storyID, page]);
    },
    onError: () => {
      toast.error("Vui lòng thử lại sau!", {
        style,
      });
    },
  });

  // reaction
  const handleLikeComment = (commentId) => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập!", {
        style,
      });
      return;
    }
    likeMutation.mutate(commentId);
  };

  const handleDisLikeComment = (commentId) => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập!", {
        style,
      });
      return;
    }

    dislikeMutation.mutate(commentId);
  };

  return (
    <div
      className={
        isReply ? cx("comment-item", "reply-item") : cx("comment-item")
      }
      key={comment.id}
    >
      <figure>
        <Link to={`/user/${comment.user.id}`}>
          <img
            src={
              comment.user.imgSrc
                ? comment.user.imgSrc
                : "/images/anonymous/anonymous.png"
            }
            alt="avatar"
          />
          {comment.user?.frame && (
            <img
              className={cx("avt-frame")}
              src={comment.user.frame}
              alt="frame"
            />
          )}
        </Link>
      </figure>

      <div className={cx("box", themeClassName)}>
        {isReply ? (
          <FontAwesomeIcon
            icon={faAngleUp}
            className={cx("left-icon", "up-icon")}
          />
        ) : (
          <FontAwesomeIcon icon={faAngleLeft} className={cx("left-icon")} />
        )}
        <div className={cx("content")}>
          <div className={cx("header")}>
            <Link className={cx("author-name")}>{comment.user.name}</Link>

            <LevelBox
              process={comment.user.level.process}
              level={comment.user.level.level}
            />

            <span className={cx("cmchapter")}>
              {`Chapter ${comment.atChapter}`}
            </span>
          </div>

          <div className={cx("comment-body", themeClassName)}>
            {isReply ? (
              <span className={cx("mention")}>
                {" "}
                <FontAwesomeIcon icon={faMailForward} />
                {comment.replyTo + " "}
              </span>
            ) : (
              ""
            )}
            {comment.content}
          </div>

          <ul className={cx("comment-footer", themeClassName)}>
            <li>
              <span
                className={cx("reply")}
                onClick={() => handleReplyClick(comment.id)}
              >
                <FontAwesomeIcon icon={faComment} className="mr4" />
                Trả lời
              </span>
            </li>

            <li>
              <span className={cx("like")} onClick={() => handleLikeComment(comment.id)}>
                <FontAwesomeIcon icon={faThumbsUp} className="mr4" />
                {likeCount === 0 ? comment.likeCount : likeCount}
              </span>
            </li>

            <li>
              <span className={cx("dislike")} onClick={() => handleDisLikeComment(comment.id)}>
                <FontAwesomeIcon icon={faThumbsDown} className="mr4" />
                {dislikeCount === 0 ? comment.dislikeCount : dislikeCount}
              </span>
            </li>

            <li>
              <abbr>{comment.createdAt}</abbr>
            </li>
          </ul>
        </div>
      </div>
      {openCommentForms[comment.id] && (
        <CommentForm
          hasDistance
          onClose={handleCloseForm}
          atChapter={comment.atChapter}
          replyTo={ comment.user.name }
          parentCommentId={comment.id}
        />
      )}
    </div>
  );
};

CommentItem.propTypes = {
  data: PropTypes.object.isRequired,
  reply: PropTypes.bool,
};

export default CommentItem;
