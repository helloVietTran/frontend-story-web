import React, { useState, useCallback } from "react";
import classname from "classnames/bind";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import SecondaryHeading from "@/components/Heading/SecondaryHeading/SecondaryHeading";
import PrimaryButton from "@/components/Button/PrimaryButton/PrimaryButton";
import UserNav from "@/components/NavTab/UserNav/UserNav";
import Grid from "@/components/Layout/Grid/Grid";
import Row from "@/components/Layout/Row/Row";
import Col from "@/components/Layout/Col/Col";

import styles from "./Shop.module.scss";
import useTheme from "@/customHook/useTheme";
import { buyItem, getPoint } from "@/api/pointApi";
import { getAvatarFrame } from "@/api/shopApi";
import { getMyInfo } from "@/api/userApi";
import toast from "react-hot-toast";
import { getInventory } from "@/api/inventoryApi";

const cx = classname.bind(styles);

function Shop() {
  const queryClient = useQueryClient();
  const themeClassName = useTheme(cx);
  const [activeItem, setActiveItem] = useState("option 1");

  // get point
  const { data: pointData } = useQuery({
    queryKey: ["point"],
    queryFn: getPoint,
  });

  // get frame
  const { data: avatarFrameData } = useQuery({
    queryKey: ["avatarFrame"],
    queryFn: getAvatarFrame,
  });
  // get user
  const { data: user } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getMyInfo,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: () => 3000,
  });

  const handleClick = useCallback((item) => {
    setActiveItem(item);
  }, []);

  // get inventory
  const { data: inventory } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventory,
    retry: 2,
    staleTime: 60 * 1000,
  });

  // mutate buy item
  const toastStyles = {
    fontSize: "14px",
  };
  const buyItemMutation = useMutation({
    mutationFn: buyItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["inventory"]);
      toast.success("Mua thành công", {
        style: toastStyles,
      });
    },
    onMutate: () => {
      toast.loading("Đang xử lý", {
        style: toastStyles,
        id: "loading",
      });
    },
    onError: () => {
      toast.error("Vui lòng thử lại sau!", {
        style: toastStyles,
      });
    },
    onSettled: () => {
      toast.dismiss("loading");
    },
  });

  const handleBuyFrame = async (itemId) => {
    if (inventory) return;
    buyItemMutation.mutate({
      itemId,
      userId: user.id,
    });
  };

  return (
    <div className={`${cx("shop")} ${themeClassName}`}>
      <SecondaryHeading size={2.2} title="Cửa hàng" bottom={20} />

      <h2 className="post-title mb20">
        Linh thạch hiện có
        <span className="user-point-current">
          {" "}
          {pointData && pointData.total}
        </span>
      </h2>

      <p className={cx("text-note")}>
        Chọn vật phẩm cần mua bởi Linh thạch. Viền sẽ được hiển thị khi bạn
        comment.
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
              {avatarFrameData &&
                avatarFrameData.map((frame) => {
                  return (
                    <Col sizeXs={3} key={frame.id}>
                      <div className={cx("product")}>
                        <img
                          alt="avt-default"
                          src="/images/anonymous/avatar_default.jpg"
                          className={cx("default-avatar")}
                        />
                        <img
                          alt="frame"
                          src={frame.imgSrc}
                          className={cx("image")}
                        />
                      </div>
                      <div className="text-center">
                        <PrimaryButton
                          title="Chọn mua"
                          color="yellow"
                          disabled={!!inventory ? true : false}
                          onClick={() => handleBuyFrame(frame.id)}
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
