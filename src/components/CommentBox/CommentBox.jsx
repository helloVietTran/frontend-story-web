import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleUp,
  faComment,
  faMailForward,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import { useSelector } from "react-redux";

import { commentApi } from "@/config/api";
import styles from "./CommentBox.module.scss";
import CommentForm from "../CommentForm/CommentForm";
import calculateTime from "@/utils/calculateTime";
import useTheme from "@/customHook/useTheme";
import { LevelBox } from "../Box";

const cx = classNames.bind(styles);

function CommentBox({ comicName }) {
  const { storyID } = useParams();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const themeClassName = useTheme(cx);

  const [commentsData, setCommentsData] = useState([]);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenReplyForm, setIsOpenReplyForm] = useState("");
  const [isOpenSecondaryReplyForm, setIsOpenSecondaryReplyForm] = useState("");

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await commentApi.getComment(storyID);
        setCommentsData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [storyID]);

  useEffect(() => {
    const socket = io(backendUrl);
    // update comment
    socket.on("new comment", ({ newComment }) => {
      setCommentsData((prevCommentData) => [...prevCommentData, newComment]);
    });

    //react comment
    socket.on("react comment", ({ commentId, likeCount, dislikeCount }) => {
      setCommentsData((prevCommentData) => {
        return prevCommentData.map((commentItem) => {
          if (commentItem._id === commentId) {
            return {
              ...commentItem,
              likeCount: likeCount,
              dislikeCount: dislikeCount,
            };
          } else {
            return commentItem;
          }
        });
      });
    });
    // update reply
    socket.on("new reply", ({ newReply, commentId }) => {
      setCommentsData((prevCommentsData) => {
        return prevCommentsData.map((comment) => {
          if (comment._id === commentId) {
            return {
              ...comment,
              replies: [...comment.replies, newReply],
            };
          }
          return comment;
        });
      });
    });
    // react reply
    socket.on("react reply", ({ replyId, commentId, likeCount, dislikeCount }) => {
    
      setCommentsData((prevCommentsData) => {
        const updatedCommentsData = JSON.parse(JSON.stringify(prevCommentsData));// tạo bản copy của state
        const commentIndex = updatedCommentsData.findIndex(comment => comment._id === commentId);
        if (commentIndex !== -1) {
          const replyIndex = updatedCommentsData[commentIndex].replies.findIndex(reply => reply._id === replyId);
          if (replyIndex !== -1) {
            updatedCommentsData[commentIndex].replies[replyIndex].likeCount = likeCount;
            updatedCommentsData[commentIndex].replies[replyIndex].dislikeCount = dislikeCount;
          }
        }
    
        return updatedCommentsData;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [backendUrl]);

  // like comment
  const likeComment = async (commentID) => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập!");
      return;
    }
    try {
      await commentApi.likeComment(commentID);
    } catch (error) {
      console.error("Lỗi khi thực hiện like comment:", error);
    }
  };

  const disLikeComment = async (commentID) => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập!");
      return;
    }
    try {
      await commentApi.dislikeComment(commentID);
    } catch (error) {
      console.error("Lỗi khi thực hiện dislike comment:", error);
    }
  };

  const likeReply = async (replyID, commentID) => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập!");
      return;
    }
    try {
      await commentApi.likeReply(replyID,commentID );
    } catch (error) {
      console.error("Lỗi khi thực hiện like reply:", error);
    }
  };

  const dislikeReply = async (replyID, commentID) => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập!");
      return;
    }
    try {
      await commentApi.dislikeReply(replyID, commentID);
    } catch (error) {
      console.error("Lỗi khi thực hiện dislike reply:", error);
    }
  };

  const toggleReply = (id) => {
    setIsOpenReplyForm((prev) => (prev === id ? "" : id));
  };

  const toggleReplyToReply = (id) => {
    setIsOpenSecondaryReplyForm((prev) => (prev === id ? "" : id));
  };
  return (
    <>
      <ul className={cx("comment-site-nav", themeClassName)}>
        <li className={cx("active")}>
          <FontAwesomeIcon icon={faComment} className="mr4" />
          VietTruyen
        </li>
      </ul>

      <div className={cx("comment-wrapper")}>
        {!isOpenForm ? (
          <div
            className={cx("placeholder")}
            onClick={() => setIsOpenForm(true)}
          >
            Mời bạn thảo luận, vui lòng không spam, share link kiếm tiền, thiếu
            lành mạnh,... để tránh bị khóa tài khoản
          </div>
        ) : (
          <CommentForm />
        )}

        <div className={cx("comment-list")}>
          {commentsData.map((comment) => {
            return (
              <div className={cx("comment-item")} key={comment._id}>
                <figure>
                  <Link to={`/user/${comment.user._id}`}>
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
                        src={comment.user.frame.imgSrc}
                        alt="frame"
                      />
                    )}
                  </Link>
                </figure>

                <div className={cx("box", themeClassName)}>
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    className={cx("left-icon")}
                  />
                  {/* -----------content--------- */}

                  <div className={cx("content")}>
                    <div className={cx("header")}>
                      <Link className={cx("author-name")}>
                        {comment.user.name}
                      </Link>

                      <LevelBox
                        process={comment.user.process}
                        level={comment.user.level}
                      />

                      <span className={cx("cmchapter")}>
                        {comment.atChapter ? `Chaptẻ ${comment.atChapter}` : ""}
                      </span>
                    </div>

                    <div className={cx("comment-body", themeClassName)}>
                      {comment.content}
                    </div>
                  </div>
                  {/* -----------foooter--------- */}
                  <ul className={cx("comment-footer", themeClassName)}>
                    <li>
                      <span
                        className={cx("reply")}
                        onClick={() => toggleReply(comment._id)}
                      >
                        <FontAwesomeIcon icon={faComment} className="mr4" />
                        Trả lời
                      </span>
                    </li>

                    <li>
                      <span
                        className={cx("like")}
                        onClick={() => likeComment(comment._id)}
                      >
                        <FontAwesomeIcon icon={faThumbsUp} className="mr4" />
                        {comment.likeCount}
                      </span>
                    </li>

                    <li>
                      <span
                        className={cx("dislike")}
                        onClick={() => disLikeComment(comment._id)}
                      >
                        <FontAwesomeIcon icon={faThumbsDown} className="mr4" />
                        {comment.dislikeCount}
                      </span>
                    </li>

                    <li>
                      <abbr>{calculateTime(comment.createdAt)}</abbr>
                    </li>
                  </ul>

                  {comment._id === isOpenReplyForm && (
                    <CommentForm
                      isReply
                      commentID={comment._id}
                      replyTo={comment.user.name}
                    />
                  )}

                  {comment.replies.length > 0 &&
                    comment.replies.map((subComment) => {
                      return (
                        <div className={cx("sub-item")} key={subComment._id}>
                          <figure>
                            <Link>
                              <img
                                src={
                                  subComment.user.frame.imgSrc
                                    ? subComment.user.frame.imgSrc
                                    : "/images/anonymous/anonymous.png"
                                }
                                alt="avatar"
                              />
                              {subComment.user?.frame && (
                                <img
                                  className={cx("avt-frame")}
                                  src={subComment.user.frame.imgSrc}
                                  alt="frame"
                                />
                              )}
                            </Link>
                          </figure>
                          <div className={cx("box")}>
                            <FontAwesomeIcon
                              icon={faAngleUp}
                              className={cx("left-icon", "up-icon")}
                            />
                            <div className={cx("content")}>
                              <div className={cx("header")}>
                                <Link className={cx("author-name")}>
                                  {subComment.user.name}
                                </Link>

                                <LevelBox
                                  level={subComment.user.level}
                                  process={subComment.user.process}
                                />
                              </div>

                              <div
                                className={cx("comment-body", themeClassName)}
                              >
                                {true ? (
                                  <span className={cx("mention")}>
                                    {" "}
                                    <FontAwesomeIcon icon={faMailForward} />
                                    {subComment?.replyTo + " "}
                                  </span>
                                ) : (
                                  ""
                                )}
                                {subComment.content}
                              </div>
                            </div>
                            <ul
                              className={cx("comment-footer", themeClassName)}
                            >
                              <li>
                                <span
                                  className={cx("reply")}
                                  onClick={() =>
                                    toggleReplyToReply(subComment._id)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faComment}
                                    className="mr4"
                                  />
                                  Trả lời
                                </span>
                              </li>
                              <li>
                                <span
                                  className={cx("like")}
                                  onClick={() =>
                                    likeReply(subComment._id, comment._id)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faThumbsUp}
                                    className="mr4"
                                  />
                                  {subComment.likeCount}
                                </span>
                              </li>

                              <li>
                                <span
                                  className={cx("dislike")}
                                  onClick={() =>
                                    dislikeReply(subComment._id, comment._id)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faThumbsDown}
                                    className="mr4"
                                  />
                                  {subComment.dislikeCount}
                                </span>
                              </li>

                              <li>
                                <abbr>
                                  {calculateTime(subComment.createdAt)}
                                </abbr>
                              </li>
                            </ul>
                            {subComment._id === isOpenSecondaryReplyForm && (
                              <CommentForm
                                isReply
                                commentID={comment._id}
                                replyTo={subComment.user.name}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CommentBox;
