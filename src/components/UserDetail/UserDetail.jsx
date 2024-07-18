import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useParams, useNavigate, Link } from "react-router-dom";

import styles from "./UserDetail.module.scss";
import useTheme from "../../customHook/useTheme";
import BreadCumb from "../BreadCumb";
import calculateTime from "../../utils/calculateTime";
import { userApi } from "../../config/api";
import  formatDate  from "../../utils/formatDate";
import { Container } from "../Layout";

const cx = classNames.bind(styles);

function UserDetail() {
  const themeClassName = useTheme(cx);

  const { userID } = useParams();
  const navigate = useNavigate(); // useNavigate để điều hướng trong một hàm

  const [activeItem, setActiveItem] = useState("item 1");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await userApi.getUserInfo(userID);
        setUserData(res.data);
      } catch (error) {
        console.log(error);
        navigate("/not-found");
      }
    };
  
    fetchUserInfo();
  }, [userID, navigate]);
  

  return (
    <Container
    isBackgroundVisible
    >
      <div className={`${cx("user-page")} ${themeClassName}`}>
        <BreadCumb />
        <div className={cx("user-detail")}>
          <div className={cx("avatar", "avatar-wrapper")}>
            <img
              alt="avatar"
              src={userData.url || "/images/anonymous/anonymous.png"}
            />
          </div>
          <div className={cx("info")}>
            <span className={cx("name")}>{userData.name}</span>
            <span className="member-level">
              <span className="level">Cấp {userData.level}</span>
              <span
                className="process-bar"
                style={{ width: userData.process + "%" }}
              ></span>
            </span>
            <p className="mt10">
              Ngày đăng ký: {formatDate(userData.createdAt)}
            </p>
            <p className="mt10">
              Linh thạch: <span className="text-danger ">{userData.point}</span>
            </p>
          </div>
        </div>
        <ul className={`nav-tabs `}>
          <li
            onClick={() => setActiveItem("item 1")}
            className={activeItem === "item 1" ? "active" : undefined}
          >
            Bình luận
          </li>
          <li
            onClick={() => setActiveItem("item 2")}
            className={activeItem === "item 2" ? "active" : undefined}
          >
            Truyện theo dõi
          </li>
        </ul>
        {activeItem === "item 1" && (
          <div className={cx("tab-content")}>
            <h3 className="post-title mb20">Bình luận mới nhất</h3>
            <section className={cx("user-table")}>
              <div className={cx("table-responsive")}>
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Tên truyện</th>
                      <th>Thời gian</th>
                      <th>Nội dung</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.comments &&
                      userData.comments.map((comment) => {
                        return (
                          <tr key={comment._id}>
                            <td>
                              <Link
                                className={cx("image")}
                                to={`/story/${comment.story.slug}/${comment.story._id}`}
                              >
                                <img alt="logo-story" src={comment.story.url} />
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/story/${comment.story.slug}/${comment.story._id}`}
                              >
                                {comment.story.name}
                              </Link>
                            </td>
                            <td>
                              <span>{calculateTime(comment.createdAt)}</span>
                            </td>
                            <td>
                              <span>{comment.content}</span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
        {activeItem === "item 2" && (
          <div className={cx("tab-content")}>
            <h3 className="post-title mb20">Truyện theo dõi</h3>
            <span>Người dùng này không công khai Truyện theo dõi</span>
          </div>
        )}
      </div>
    </Container>
  );
}

export default UserDetail;
