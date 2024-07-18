import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classname from "classnames/bind";

import styles from "./ComicFollowed.module.scss";
import { SecondaryHeading } from "@/components/Heading";
import { storyApi } from "@/config/api";
import { NotifyBox } from "@/components/Box";
import useTheme from "@/customHook/useTheme";
import FollowAction from "@/components/FollowAction";
import calculateTime from "@/utils/calculateTime";

const cx = classname.bind(styles);

function ComicFollowed() {
  const [followedData, setFollowedData] = useState([]);
  const [markedStory, setMarkedStory] = useState([]);

  const themeClassName = useTheme(cx);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await storyApi.getFollowedStories();
        setFollowedData(res.data.follow);
        setMarkedStory(res.data.markAsRead);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`${cx("comics-followed")} ${themeClassName}`}>
      <SecondaryHeading size={2.2} bottom={20} title="Truyện đang theo dõi" />
      <NotifyBox
        content='Truyện chưa đọc sẽ hiển thị ở đầu danh sách, nhấn vào "Đã đọc" nếu
        truyện đọc rồi.'
        color="green"
        bottom={20}
      />
      <div>
        <table className="table">
          <thead>
            <tr>
              <th colSpan="2">Tên truyện</th>
              <th>Chap mới nhất</th>
            </tr>
          </thead>
          <tbody>
            {followedData &&
              followedData.map((story) => {
                return (
                  <tr key={story._id}>
                    <td>
                      <Link className="image" to="/">
                        <img src={story.url} alt="followed-item" />
                      </Link>
                    </td>
                    <td>
                      <Link className={cx("comic-name")}>
                        {story.name}
                      </Link>
                      <FollowAction
                        storyID={story._id}
                        markedAsReadStory={markedStory}
                      />
                    </td>
                    <td className={cx("chapter")}>
                      <div className="d-flex">
                        <Link
                          to={`/story/${story.slug}/${story._id}/chap-${story.lastChapter}`}
                        >
                          Chap {story.lastChapter}
                        </Link>
                        <time>{calculateTime(story.updatedAt)}</time>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComicFollowed;
