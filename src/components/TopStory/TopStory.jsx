import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";

import ListFrame from "@/components/List/ListFrame/ListFrame";
import PrimaryListItem from "@/components/List/PrimaryListItem/PrimaryListItem";
import TextRank from "@/components/TextRank/TextRank";

import styles from "./TopStory.module.scss";
import useTheme from "@/customHook/useTheme";
import createQueryFn from "@/utils/createQueryFn";
import { getTopStories } from "@/api/storyApi";

const cx = classNames.bind(styles);
function TopStory() {
  const themeClassName = useTheme(cx);
  const {data} =  useQuery({
    queryKey: ["topStories"],
    queryFn: createQueryFn(getTopStories),
    onError: (error) => {
      console.error("Error fetching stories:", error);
    },
  });
  
  return (      
    <ListFrame>
      <div className={cx("topStory-header", themeClassName)}>
        <Link className={cx("active")} to="/">
          Top tháng
        </Link>
        <Link to="/find-story?sort=11&status=-1">Top tuần</Link>
        <Link to="/find-story?sort=10&status=-1">Top ngày</Link>
      </div>
      {data &&
        data.map((story, index) => {
          return (
            <div
              className={cx("topStory-item")}
              key={story.id}
            >
              <TextRank 
                index={index}
              />

              <PrimaryListItem 
                hasViewCount
                data={story}
              />
            </div>
          );
        })}
    </ListFrame>
    
  );
}

export default TopStory;
