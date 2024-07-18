import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { commentApi } from "../../config/api";
import styles from "./CommentForm.module.scss";
import { PrimaryButton } from "../Button";

const cx = classNames.bind(styles);

function CommentForm({ isReply, commentID, replyTo }) {
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { storyID, chap } = useParams();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  let handleSubmitComment = async () => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập!");
      setContent("");
      return;
    }
    if (content.length < 1) {
      alert("Vui lòng nhập nội dung!");
      return;
    }

    try {
      await commentApi.createComment(storyID, chap?.slice(5), content);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }  
    setContent("");
  };
  //ghi đè hàm gửi dữ liệu
   if(isReply){
    handleSubmitComment = async () => {
      if (!isAuthenticated) {
        alert("Vui lòng đăng nhập!");
        setContent("");
        return;
      }
      if (content.length < 1) {
        alert("Vui lòng nhập nội dung!");
        return;
      }
  
      try {
        await commentApi.createReply(commentID, replyTo, content);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
      setContent("");
    };
   }

  return (
    <div className={cx("comment-form")}>
      <div className={cx("comment-input")}>
          <textarea
            type="text"
            value={content}
            name="content"
            onChange={(e) => setContent(e.target.value)}
            ref={inputRef}
          />
      </div>
      <div className="mt4">
        <PrimaryButton 
          color="blue"
          title="Gửi"
          onClick={()=> handleSubmitComment()}
        />
      </div>
      

      <div className={`${cx("alert-box")} ${showAlert ? cx("show") : ""}`}>
        Comment thành công!
      </div>
    </div>
  );
}

export default CommentForm;
