import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import ListHeading from "../Heading/ListHeading/ListHeading";
import ListFrame from "../List/ListFrame/ListFrame";
import PrimaryListItem from "../List/PrimaryListItem/PrimaryListItem";

import { getMyFollowedStories } from "@/api/storyApi";
import { getMyInfo } from "@/api/userApi";
import useTheme from "@/customHook/useTheme";
import styles from "./FollowedComic.module.scss"

const cx = classNames.bind(styles);
function FollowedComicList() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const themeClassName = useTheme(cx);

  const { data: user } = useQuery({
    enabled: isAuthenticated, // chỉ gọi sau khi đã xác thực
    queryKey: ["userProfile"],
    queryFn: getMyInfo,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: () => 3000,
  });

  const { data: followedStories } = useQuery({
    enabled: !!user?.id,
    queryKey: user ? ["followedStories", user.id] : [],
    queryFn: getMyFollowedStories,
    retryDelay: () => 3000,
  });


  return (
    <ListFrame>
      <ListHeading title="Truyện đang theo dõi" path="/following" />
      {isAuthenticated && followedStories ? (
        followedStories.map(item => {
          return <PrimaryListItem data={item.story} key={item.id} />;
        })
      ) : (
        <p className={`${themeClassName}`}>Vui lòng đăng nhập để sử dụng chức năng theo dõi truyện</p>
      )}
    </ListFrame>
  );
}

export default FollowedComicList;
