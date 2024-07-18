import React, { useState, useEffect } from "react";
import classname from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./Comment.module.scss";
import { SecondaryHeading } from "../../../Heading";
import useTheme from "../../../../customHook/useTheme";
import { userApi } from "../../../../config/api";
import calculateTime from "../../../../utils/calculateTime";

const cx = classname.bind(styles);

function Comment() {
  const themeClassName = useTheme(cx);
  const [commentData, setCommentData] = useState([]);

  console.log(commentData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userApi.getCommentOfUser();
        setCommentData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`${cx("comment")} ${themeClassName}`}>
      <SecondaryHeading size={2.2} bottom={20} title="Truyện đang theo dõi" />
      <table className="table">
        <thead>
          <tr>
            <th colSpan="2">Tên truyện</th>
            <th>Thời gian</th>
            <th>Nội dung</th>
          </tr>
        </thead>
        <tbody>
          {commentData &&
            commentData.map((comment) => {
              return (
                <tr key={comment._id}>
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

                  <td >
                    <div className={cx('wrapper')}>
                      <time>{calculateTime(comment.createdAt)}</time>
                      <Link>Chapter {comment.chapter}</Link>
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

export default Comment;
