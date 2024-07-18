import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";

import styles from "./NewComment.module.scss";
import { PrimaryHeading } from "../Heading";
import { ListFrame } from "../List";
import useTheme from "../../customHook/useTheme";
import { commentApi } from "../../config/api";
import calculateTime from "../../utils/calculateTime";

const cx = classNames.bind(styles);

function NewComment() {
  const themeClassName = useTheme(cx);
  const [newCommentData, setNewCommentData] = useState([]);

  useEffect(() => {
    const fetchNewCommentData = async () => {
      try {
        const res = await commentApi.getNewComment();
        setNewCommentData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchNewCommentData();
  }, []);
  
  return (
    <ListFrame>
      <PrimaryHeading 
        title="Bình luận mới"
        bottom={10}
        size={1.6}
      />
      {newCommentData.map((comment) => {
        return (
          <div className={cx("newComment-item", themeClassName)} key={comment._id}>
            <div className={cx("story")}>
              <Link to={`/story/${comment.story.slug}/${comment.story._id}`}>
                <h3>{comment.story.name}</h3>
              </Link>
              <Link
                to={`/story/${comment.story.slug}/${comment.story._id}/chap-${comment.chapter}`}
              >
                {comment.atChapter ? "Chapter " + comment.atChapter : ""}
              </Link>
            </div>
            <div className={cx("comment")}>
              <img
                alt="avatar"
                src={comment.user.imgSrc || "images/anonymous/anonymous.png"}
              />
              <div className={cx("caption")}>
                <div className={cx("author")}>
                  <h3 className={cx("name")}>{comment.user.name}</h3>
                  <span className={cx("time")}>
                    <FontAwesomeIcon icon={faClockFour} />
                    <span>{calculateTime(comment.createdAt)}</span>
                  </span>
                </div>
                <p className={cx("text")}>{comment.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </ListFrame>
  );
}

export default NewComment;
