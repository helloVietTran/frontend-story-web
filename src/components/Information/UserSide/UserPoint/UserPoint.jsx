import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import classname from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import styles from "./UserPoint.module.scss";
import useTheme from "@/customHook/useTheme";
import { pointApi } from "@/config/api";
import { updateUser } from "@/actions/auth";
import { UserNav } from "@/components/NavTab";
import { PrimaryButton } from "@/components/Button";
import { SecondaryHeading } from '@/components/Heading'

const cx = classname.bind(styles);

function UserPoint() {
  const themeClassName = useTheme(cx);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [activeItem, setActiveItem] = useState("option 1");
  const [pointData, setPointData] = useState(null);
  const [disabledButton, setDisabledButton] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await pointApi.getPoint();
        setPointData(res.data);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (res.data.lastAttendanceDate === today.toISOString()) {
          setDisabledButton(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //real time
  useEffect(() => {
    const socket = io(backendUrl);
    socket.on("attendance", ({ totalPoints, historyItem }) => {
      setDisabledButton(true);
      user.point = totalPoints;
      dispatch(updateUser(user));
      setPointData((prevData) => {
        return {
          ...prevData,
          totalPoints: totalPoints,
          history: [...prevData.history, historyItem],
        };
      });
    });

    socket.on("buy frame", ({ totalPoints, historyItem }) => {
      user.point = totalPoints;
      dispatch(updateUser(user));
      setPointData((prevData) => {
        return {
          ...prevData,
          totalPoints: totalPoints,
          history: [...prevData.history, historyItem],
        };
      });
    });
    return () => {
      socket.disconnect();
    };
  }, [backendUrl]);

  const handleClick = useCallback((item) => {
    setActiveItem(item);
  }, []);

  const handleAttendance = async () => {
    try {
      await pointApi.attendance();
      // Refresh point data after attendance
      const res = await pointApi.getPoint();
      setPointData(res.data);
      setDisabledButton(true); // Assuming disable the button after attendance
    } catch (error) {
      console.log(error);
    }
  };

  function formatDateTime(dateTimeString) {
    const dateObject = new Date(dateTimeString);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    const formattedDate = `${hours}:${minutes} ${day}/${month}`;
    return formattedDate;
  }
  return (
    <div className={`${cx("user-point")} ${themeClassName}`}>
      <SecondaryHeading size={2.2} title="Linh thạch" bottom={20} />
      <h2 className={cx('post-heading')} >
        Linh thạch hiện có
        <span className="user-point-current"> {pointData?.totalPoints}</span>
      </h2>
      <p>
        Linh thạch thể hiện mức độ Tài Phú của bạn tại Viettruyen, dùng để
        <Link to="/secure/shop"> mua vật phẩm</Link> , đẩy truyện yêu thích lên
        Top xếp hạng, thi đua Top thành viên, tạo Bang phái, unlock comment,
        unlock ban, thách đấu,... Kiếm Linh thạch bằng cách làm nhiệm vụ
        <span> Điểm danh</span>, <span>Làm nhiệm vụ ngày</span>,
        <span> Review truyện</span>,...
      </p>
      
      <UserNav 
        options = {['Lịch sử', 'Điểm danh']}
        activeItem= {activeItem}
        onClick= {handleClick}
      />
      {activeItem === "option 1" && (
        <table className="table">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Loại</th>
              <th>Linh thạch</th>
            </tr>
          </thead>
          <tbody>
            {pointData?.history &&
              pointData.history.reverse().map((historyItem) => {
                return (
                  <tr key={historyItem._id}>
                    <td>{formatDateTime(historyItem.date)}</td>
                    <td>{historyItem.type}</td>
                    <td className="text-success">{historyItem.description}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      {activeItem === "option 2" && (
        <>
          <h3 className="mt5 mb10">Lưu ý</h3>
          <ul className={`${cx("note")} mb20`}>
            <li>Mỗi ngày chỉ được điểm danh 1 lần</li>
            <li>Mỗi lần điểm danh sẽ nhận được 100 Linh thạch</li>
            <li>Điểm danh liên tục 7 ngày sẽ tặng thêm 300 Linh thạch</li>
          </ul>

          <PrimaryButton
            title="Điểm danh"
            color="green"
            onClick={() => handleAttendance()}
            disabled={disabledButton}
          />
        </>
      )}
    </div>
  );
}

export default UserPoint;
