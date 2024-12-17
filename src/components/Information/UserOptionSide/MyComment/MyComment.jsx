import React from "react";
import classname from "classnames/bind";
import { Link } from "react-router-dom";

import SecondaryHeading from "@/components/Heading/SecondaryHeading/SecondaryHeading";

import styles from "./MyComment.module.scss";
import useTheme from "@/customHook/useTheme";
import { useQuery } from "@tanstack/react-query";
import { getMyComment } from "@/api/commentApi";

const cx = classname.bind(styles);

function MyComment() {
  const themeClassName = useTheme(cx);

  const { data: commentData } = useQuery({
    queryKey: ["myComment"],
    queryFn: getMyComment,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: () => 3000,
  });
  console.log(commentData);

  return (
    <div className={`${cx("comment")} ${themeClassName}`}>
      <SecondaryHeading size={2.2} bottom={20} title="Truyện đang theo dõi" />
      <table className="table">
        <thead>
          <tr>
            <th colSpan="2">Tên truyện</th>
            <th>Chapter</th>
            <th>Thời gian</th>
            <th>Nội dung</th>
          </tr>
        </thead>
        <tbody>
          {commentData &&
            commentData.map((comment) => {
              return (
                <tr key={comment.id}>
                  <td>
                    <Link to="">
                      <img src={comment.story.imgSrc} alt="story-logo" />
                    </Link>
                  </td>
                  <td>
                    <Link className={cx("story-name")}>
                      {comment.story.name}
                    </Link>
                  </td>

                  <td>
                    <div className={cx("wrapper")}>
                      <Link>Chapter {comment.atChapter}</Link>
                    </div>
                  </td>

                  <td>
                    <div className={cx("wrapper")}>
                      <time>{comment.createdAt}</time>
                    </div>
                  </td>
                  <td>{comment.content}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default MyComment;
