import { useState, useEffect } from "react";
import classNames from "classnames/bind";
 
import { PrimaryHeading } from "../Heading"
import { ListFrame, TextRank } from "../List";
import { userApi } from "../../config/api";
import { LevelBox } from "../Box"
import useTheme from "../../customHook/useTheme";
import styles from "./TopUser.module.scss";

const cx = classNames.bind(styles);
function TopUser() {
  const [topUserData, setTopUserData] = useState([]);
  const themeClassName = useTheme(cx);

  useEffect(() => {
    const fetchTopUser = async () => {
      try {
        const res = await userApi.getTopUser();
        setTopUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchTopUser();
  }, []);

  return (
    <ListFrame>
      <PrimaryHeading 
        title="Top thành viên"
        size={1.6}
        bottom={10}
      />
      {topUserData.map((user, index) => {
        return (
          <div className={cx("topUser-item", themeClassName)} key={user._id}>

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
                  level={user.level}
                  process={user.process}
                />
                <LevelBox 
                  point={user.point}
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
