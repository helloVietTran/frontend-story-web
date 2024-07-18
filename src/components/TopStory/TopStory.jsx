import {  useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./TopStory.module.scss";
import useTheme from "../../customHook/useTheme";
import { storyApi } from "../../config/api";
import { ListFrame, PrimaryListItem, TextRank } from "../List";

const cx = classNames.bind(styles);
function TopStory() {
  const themeClassName = useTheme(cx);
  const [topStoryData, setTopStoryData] = useState(null);

  useEffect(() => {
    const fetchTopStory = async () => {
      try {
        const res = await storyApi.getTopStory();
        setTopStoryData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchTopStory();
  }, []);
  
  return (      
    <ListFrame>
      <div className={cx("topStory-header", themeClassName)}>
        <Link className={cx("active")} to="/">
          Top tháng
        </Link>
        <Link to="/">Top tuần</Link>
        <Link to="/">Top ngày</Link>
      </div>
      {topStoryData &&
        topStoryData.map((story, index) => {
          return (
            <div
              className={cx("topStory-item")}
              key={story._id}
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
