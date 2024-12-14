import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import ListHeading from "../Heading/ListHeading/ListHeading";
import ListFrame from "../List/ListFrame/ListFrame";
import PrimaryListItem from "../List/PrimaryListItem/PrimaryListItem";

import createQueryFn from "@/utils/createQueryFn";
import { getMyFollowedStories } from "@/api/storyApi";
import { getMyInfo } from "@/api/userApi";

function FollowedComicList() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { data: user, refetch } = useQuery({
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
    queryFn: createQueryFn(getMyFollowedStories),
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
        <p>Vui lòng đăng nhập để sử dụng chức năng theo dõi truyện</p>
      )}
    </ListFrame>
  );
}

export default FollowedComicList;
