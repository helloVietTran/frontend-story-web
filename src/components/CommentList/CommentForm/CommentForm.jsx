import { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import PrimaryButton from "../../Button/PrimaryButton/PrimaryButton";

import styles from "./CommentForm.module.scss";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "@/api/commentApi";

const cx = classNames.bind(styles);

function CommentForm({
  hasDistance = false,
  parentCommentId,
  atChapter,
  replyTo,
}) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const inputRef = useRef();
  const { storyID } = useParams();

  const { isAuthenticated } = useSelector((state) => state.auth);

  //define mutation
  const style = {
    fontSize: "14px",
  };

  const postCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      toast.success("Comment thành công!", {
        style,
      });
      queryClient.invalidateQueries(["storyComments", storyID]);
    },
    onError: () => {
      toast.error("Vui lòng thử lại sau!", {
        style,
      });
    },
  });

  const handleSubmitComment = async () => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để bình luận!", {
        style,
      });
      return;
    }
    if (!content.trim()) {
      toast.error("Nội dung bình luận không được để trống!", {
        style,
      });
      return;
    }

    postCommentMutation.mutate({
      atChapter: atChapter || 1,
      content,
      parentCommentId: parentCommentId || null,
      storyId: storyID,
      replyTo: replyTo || null,
    });
  };

  // clean comment
  const handleClearContent = () => {
    setContent("");
    inputRef.current.focus();
  };

  return (
    <div
      className={
        hasDistance ? cx("comment-form", "distance") : cx("comment-form")
      }
    >
      <div className={cx("comment-input")}>
        <textarea
          type="text"
          value={content}
          name="content"
          placeholder={replyTo ? `Trả lời ${replyTo}` : "Viết bình luận..."}
          onChange={(e) => setContent(e.target.value)}
          ref={inputRef}
        />
      </div>
      <div className="mt4" style={{ display: "flex", gap: "10px" }}>
        <PrimaryButton color="blue" title="Gửi" onClick={handleSubmitComment} />
        <PrimaryButton color="default" title="Xóa" onClick={handleClearContent} />
      </div>
    </div>
  );
}

CommentForm.propTypes = {
  hasDistance: PropTypes.bool,
  replyTo: PropTypes.string,
  parentCommentId: PropTypes.string,
  atChapter: PropTypes.number,
  onClose: PropTypes.func,
};

export default CommentForm;
