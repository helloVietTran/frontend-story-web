import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";

import PrimaryHeading from "../Heading/PrimaryHeading/PrimaryHeading";
import ListFrame from "../List/ListFrame/ListFrame";

import styles from "./NewComment.module.scss"
import useTheme from "@/customHook/useTheme";
import createQueryFn from "@/utils/createQueryFn";
import { getNewComment } from "@/api/commentApi";

const cx = classNames.bind(styles);

function NewComment() {
  const themeClassName = useTheme(cx);

  const {data} = useQuery({
    queryKey: ["newComments"],
    queryFn: createQueryFn(getNewComment),
    onError: (error) => {
      console.error("Error fetching new comment:", error);
    },
  });
  
  return (
    <ListFrame>
      <PrimaryHeading 
        title="Bình luận mới"
        bottom={10}
        size={1.6}
      />
      {data && data.data.map((comment) => {
        return (
          <div className={cx("newComment-item", themeClassName)} key={comment.id}>
            <div className={cx("story")}>
              <Link to={`/story/${comment.story.slug}/${comment.story.id}`}>
                <h3>{comment.story.name}</h3>
              </Link>
              <Link
                to={`/story/${comment.story.slug}/${comment.story.id}/chap-${comment.atChapter}`}
              >
                {"Chapter " + comment.atChapter}
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
                    <span>{comment.createdAt}</span>
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
