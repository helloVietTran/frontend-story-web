import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import classname from "classnames/bind";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import UserNav from "@/components/NavTab/UserNav/UserNav";
import PrimaryButton from "@/components/Button/PrimaryButton/PrimaryButton";
import SecondaryHeading from "@/components/Heading/SecondaryHeading/SecondaryHeading";

import styles from "./UserPoint.module.scss";
import useTheme from "@/customHook/useTheme";
import { attendance, getPoint } from "@/api/pointApi";
import isToday from "@/utils/isToday";
import calculateTime from "@/utils/calculateTime";

const cx = classname.bind(styles);

function UserPoint() {
  const themeClassName = useTheme(cx);
  const queryClient = useQueryClient();

  const [activeItem, setActiveItem] = useState("option 1");

  const { data: pointData } = useQuery({
    queryKey: ["point"],
    queryFn: getPoint,
  });

  const attendanceMutation = useMutation({
    mutationFn: attendance,
    onSuccess: () => {
      queryClient.invalidateQueries(["point"]);
      toast.success("Điểm danh thành công!", {
        style: {
          fontSize: "14px",
        },
      });
    },
    onError: () => {
      toast.error("Vui lòng thử lại sau!", {
        style: {
          fontSize: "14px",
        },
      });
    },
  });

  const handleClick = useCallback((item) => {
    setActiveItem(item);
  }, []);

  const handleAttendance = async () => {
    if (isToday(pointData.lastAttendanceDate)) return;
    attendanceMutation.mutate();
  };

  return (
    <div className={`${cx("user-point")} ${themeClassName}`}>
      <SecondaryHeading size={2.2} title="Linh thạch" bottom={20} />
      <h2 className={cx("post-heading")}>
        Linh thạch hiện có
        <span className="user-point-current">
          {" "}
          {pointData && pointData.total}
        </span>
      </h2>
      <p>
        Linh thạch thể hiện mức độ Tài Phú của bạn tại Viettruyen, dùng để
        <Link to="/secure/shop"> mua vật phẩm</Link>, thi đua Top thành viên,
        tạo Bang phái,... Kiếm Linh thạch bằng cách làm nhiệm vụ
        <span> Điểm danh</span>, <span>Làm nhiệm vụ ngày</span>,
        <span> Review truyện</span>,...
      </p>

      <UserNav
        options={["Lịch sử", "Điểm danh"]}
        activeItem={activeItem}
        onClick={handleClick}
      />
      {activeItem === "option 1" && (
        <table className="table">
          <thead>
            <th>Thời gian</th>
            <th>Loại</th>
            <th>Linh thạch</th>
          </thead>
          <tbody>
            {pointData.pointHistories &&
              pointData.pointHistories.reverse().map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{calculateTime(item.createdAt)}</td>
                    <td>{item.type === "ATTENDANCE" ? "Điểm danh" : "Mua vật phẩm"}</td>
                    <td
                      className={
                        item.type === "ATTENDANCE"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {item?.description}
                    </td>
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
            onClick={handleAttendance}
            disabled={isToday(pointData.lastAttendanceDate)}
          />
        </>
      )}
    </div>
  );
}

export default UserPoint;
