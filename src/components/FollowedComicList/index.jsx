import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { ListHeading } from "../Heading";
import { storyApi } from "../../config/api";
import { PrimaryListItem, ListFrame } from "../List";

function FollowedComicList() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  
  const [followedStoryData, setFollowedStoryData] = useState([]);

  useEffect(() => {
    async function fetchFollowedStory() {
      try {
        const res = await storyApi.getFollowedStories();
        setFollowedStoryData(res.data.follow.slice(-5));
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchFollowedStory();
  }, []);

  return (
    <ListFrame>
      <ListHeading 
        title="Truyện đang theo dõi"
        path="/following"
      /> 
      {isLoggedIn
      ? 
        followedStoryData.map((followedStory) => {
          return (
              <PrimaryListItem 
                data={followedStory}
                key={followedStory._id}
              />
            );
        })
      : <p>Vui lòng đăng nhập để sử dụng chức năng theo dõi truyện</p>}
    </ListFrame>
  );
}

export default FollowedComicList;
