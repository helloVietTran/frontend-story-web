import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";
 
import PrimaryHeading  from "@/components/Heading/PrimaryHeading/PrimaryHeading"
import ListFrame from "@/components/List/ListFrame/ListFrame";
import TextRank from "@/components/TextRank/TextRank";
import LevelBox from "@/components/Box/LevelBox/LevelBox";

import useTheme from "../../customHook/useTheme";
import styles from "./TopUser.module.scss";
import { getTopUsers } from "@/api/userApi";
import createQueryFn from "@/utils/createQueryFn";

const cx = classNames.bind(styles);
function TopUser() {
  const themeClassName = useTheme(cx);

  const {data} =  useQuery({
    queryKey: ["topUsers"],
    queryFn: createQueryFn(getTopUsers),
    onError: (error) => {
      console.error("Error fetching top stories:", error);
    },
    staleTime: 5*1000,
  });
  return (
    <ListFrame>
      <PrimaryHeading 
        title="Top thành viên"
        size={1.6}
        bottom={10}
      />
      {data && data.map((user, index) => {
        return (
          <div className={cx("topUser-item", themeClassName)} key={user.id}>

            <TextRank 
              index={index}
            />

            <div className={cx('info')}>
              <img
                alt="avatar"
                className={cx("image")}
                src={user.imgSrc || "images/anonymous/anonymous.png"}
              />
              <div className={cx("body")}>
                <h3>{user.name}</h3>

                <LevelBox 
                  level={user.level.level}
                  process={user.level.proces*100}
                />
                <LevelBox 
                  point={user.level.rankName}
                />
              </div>
              </div>
          </div>
        );
      })}
    </ListFrame>
  );
}

export default TopUser;
