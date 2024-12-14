import React from "react";
import { Link } from "react-router-dom";
import classname from "classnames/bind";
import { useMutation, useQuery } from "@tanstack/react-query";

import SecondaryHeading from "@/components/Heading/SecondaryHeading/SecondaryHeading";
import NotifyBox from "@/components/Box/NotifyBox/NotifyBox";
import FollowAction from "@/components/FollowAction/FollowAction";

import styles from "./ComicFollowed.module.scss";
import useTheme from "@/customHook/useTheme";
import { getMyFollowedStories } from "@/api/storyApi";

const cx = classname.bind(styles);

function ComicFollowed() {
  const themeClassName = useTheme(cx);

  const { data: followedData } = useQuery({
    queryKey: ["followedStories"],
    queryFn: getMyFollowedStories,
    staleTime: 5 * 60 * 1000,
  });

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
              followedData.map((follow) => {
                return (
                  <tr key={follow.id}>
                    <td>
                      <Link className="image" to="/">
                        <img src={follow.story.imgSrc} alt="followed-item" />
                      </Link>
                    </td>
                    <td>
                      <Link className={cx("comic-name")}>
                        {follow.story.name}
                      </Link>
                      {/* <FollowAction
                        storyID={story._id}
                        markedAsReadStory={}
                      />*/}
                    </td>
                    <td className={cx("chapter")}>
                      <div className="d-flex">
                        <Link
                          to={`/story/${follow.story.slug}/${follow.story.id}/chap-${follow.story.newestChapter}`}
                        >
                          Chap {follow.story.newestChapter}
                        </Link>
                        <time>{follow.story.updatedAt}</time>
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
