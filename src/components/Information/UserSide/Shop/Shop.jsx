import React, { useState, useEffect, useCallback } from "react";
import classname from "classnames/bind";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useDispatch } from "react-redux";

import styles from "./Shop.module.scss";
import useTheme from "@/customHook/useTheme";
import { SecondaryHeading } from "@/components/Heading";
import { avatarBorderApi, pointApi } from "@/config/api";
import { updateUser } from "@/actions/auth";
import { PrimaryButton } from "@/components/Button";
import { UserNav } from "@/components/NavTab";
import { Grid, Row, Col } from "@/components/Layout";

const cx = classname.bind(styles);

function Shop() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const themeClassName = useTheme(cx);

  const [activeItem, setActiveItem] = useState("option 1");
  
  const [avatarBorderData, setAvatarBorderData] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(user?.frame);
  const [pointData, setPointData] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {

    const fetchPointData = async () => {
      try {
        const res = await pointApi.getPoint();
        setPointData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPointData();
  }, []);

  useEffect(() => {
    const fetchAvatarBorderData = async () => {
      try {
        const res = await avatarBorderApi.getAvatarBorder();
        setAvatarBorderData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAvatarBorderData();
  }, []);

  //real time
  useEffect(() => {
    const socket = io(backendUrl);
    socket.on("buy frame", ({ frame, totalPoints }) => {
      setDisabledBtn(!disabledBtn);
      user.frame = frame;
      dispatch(updateUser(user));
      setPointData((prevData) => {
        return {
          ...prevData,
          totalPoints: totalPoints,
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [user, backendUrl, disabledBtn, dispatch]);

  const handleClick = useCallback((item) => {
    setActiveItem(item);
  }, []);

  const handleBuyFrame = async (id) => {
    try {
      await avatarBorderApi.buyAvatarBorder(id);
      // Optionally, fetch avatar border data again after buying
      //const res = await avatarBorderApi.getAvatarBorder();
      // setAvatarBorderData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${cx("shop")} ${themeClassName}`}>
      <SecondaryHeading size={2.2} title="Cửa hàng" bottom={20} />

      <h2 className="post-title mb20">
        Linh thạch hiện có
        <span className="user-point-current">
          {" "}
          {pointData && pointData.totalPoints}
        </span>
      </h2>

      <p className={cx("text-note")}>
        Chọn vật phẩm cần mua bởi Linh thạch, lưu ý Linh thạch chỉ "cày" mới có,
        không có nạp tiền. Viền sẽ được hiển thị khi bạn comment
      </p>

      <UserNav
        options={["Viền avatar", "Bang hội"]}
        onClick={handleClick}
        activeItem={activeItem}
      />

      {activeItem === "option 1" && (
        <>
          <p className="mb20">
            Tất cả vật phẩm đều đồng giá <span className="red">100</span> Linh
            thạch trong 1 ngày
          </p>
          <Grid>
            <Row>
              {avatarBorderData.map((avatarBorder) => {
                return (
                  <Col sizeXs={3} key={avatarBorder._id}>

                    <div className={cx("product")}>
                      <img
                        alt="avt-default"
                        src="/images/anonymous/avatar_default.jpg"
                        className={cx("default-avatar")}
                      />
                      <img
                        alt="frame"
                        src={avatarBorder.imgSrc}
                        className={cx("image")}
                      />
                    </div>
                    <div className="text-center">
                      <PrimaryButton
                        title="Chọn mua"
                        color="yellow"
                        disabled={disabledBtn}
                        onClick={() => handleBuyFrame(avatarBorder._id)}
                      />
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Grid>
        </>
      )}
      {activeItem === "option 2" && (
        <>
          <span>Chức năng đang được phát triển</span>
        </>
      )}
    </div>
  );
}

export default Shop;
