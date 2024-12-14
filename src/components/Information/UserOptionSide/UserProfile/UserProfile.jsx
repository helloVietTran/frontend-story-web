import React, { useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import classname from "classnames/bind";

import SecondaryHeading from "@/components/Heading/SecondaryHeading/SecondaryHeading";
import Row from "@/components/Layout/Row/Row";
import Col from "@/components/Layout/Col/Col";
import PostHeading from "@/components/Heading/PostHeading/PostHeading";
import PrimaryButton from "@/components/Button/PrimaryButton/PrimaryButton";

import useTheme from "@/customHook/useTheme";
import styles from "./UserProfile.module.scss";
import { getMyInfo, updateUserInfo, uploadAvatar } from "@/api/userApi";
import toast from "react-hot-toast";

const cx = classname.bind(styles);

function UserProfile() {
  const themeClassName = useTheme(cx);

  const [infoData, setInfoData] = useState({
    newUserName: "",
    newSurName: "",
    gender: "",
    class: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getMyInfo,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: () => 3000,
  });

  const toastStyles = {
    fontSize: "14px",
  };
  // define mutation
  const updateUserMutate = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (data) => {
      toast.success("Cập nhật tài khoản thành công", {
        style: toastStyles,
      });

      queryClient.refetchQueries(["userProfile"]);

      setInfoData({
        newUserName: "",
        newSurName: "",
        gender: "",
        class: "",
      });
    },
    onError: (error) => {
      toast.error("Vui lòng thử lại sau.", {
        style: toastStyles,
      });
    },
    onMutate: () => {
      toast.loading("Đang xử lý", {
        style: toastStyles,
        id: "loading",
      });
    },
    onSettled: () => {
      toast.dismiss("loading");
    },
  });

  const uploadAvatarMutate = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (data) => {
      queryClient.refetchQueries(["userProfile"]);
    },
    onError: (error) => {
      toast.error("Upload avatar thất bại. \n Vui lòng thử lại sau", {
        style: toastStyles,
      });
    },
  });

  // config useDropzone
  // ảnh được mã hóa thành dạng base64 để xem trước ảnh thay vì tải lên server
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/webp": [],
    },
    maxFiles: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfoData({ ...infoData, [name]: value });
  };

  // mã hóa ngược lại ảnh trước khi gửi
  function base64ToFile(base64, filename) {
    const byteString = atob(base64.split(',')[1]); 
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
  
    const blob = new Blob([uintArray], { type: 'image/jpeg' }); 
    return new File([blob], filename, { type: 'image/jpeg' });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      infoData.newSurName + infoData.newUserName !== "" ||
      infoData.gender !== ""
    )
      updateUserMutate.mutate({ userId: user.id, infoData });

    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", base64ToFile(selectedImage));
      formData.append("userId", user.id);

      uploadAvatarMutate.mutate(formData);
      setSelectedImage(null);
    }
  };

  return (
    <div className={cx("user-profile", themeClassName)}>
      <SecondaryHeading size={2.2} bottom={20} title="Thông tin người dùng" />
      {user && (
        <Row>
          <Col sizeXs={9}>
            <PostHeading title="Cập nhật tài khoản" isRequired bottom={15} />

            <div className="form-group">
              <label htmlFor="userName" className="control-label">
                Tên người dùng
              </label>
              <input
                name="userName"
                value={user.name}
                className="form-control mt5 "
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="control-label">
                Địa chỉ email
              </label>
              <input
                name="email"
                value={user.email}
                className="form-control mt5 "
                disabled
              />
            </div>

            <div className="mt15">
              <Row>
                <Col sizeXs={6}>
                  <div className="form-group">
                    <label htmlFor="name" className="control-label">
                      Tên<span>*</span>
                    </label>
                    <input
                      onChange={handleInputChange}
                      value={infoData.newUserName}
                      name="newUserName"
                      placeholder="Tên"
                      className="form-control mt5 "
                    />
                  </div>
                </Col>

                <Col sizeXs={6}>
                  <div className="form-group">
                    <label htmlFor="surname" className="control-label">
                      Họ<span>*</span>
                    </label>
                    <input
                      onChange={handleInputChange}
                      value={infoData.newSurName}
                      name="newSurName"
                      placeholder="Họ"
                      className="form-control mt5 "
                    />
                  </div>
                </Col>
              </Row>

              <Col sizeXs={12}>
                <div className="form-group">
                  <label htmlFor="gender" className="control-label">
                    Giới tính<span>*</span>
                  </label>
                  <select
                    name="gender"
                    placeholder="Giới tính"
                    className="form-control mt5"
                    onChange={handleInputChange}
                    value={infoData.gender}
                  >
                    <option value></option>
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                  </select>
                </div>
              </Col>
              <Col sizeXs={12}>
                <div className="form-group">
                  <label htmlFor="rank" className="control-label">
                    Cấp bậc<span>*</span>
                  </label>
                  <select
                    name="class"
                    className="form-control mt5 "
                    onChange={handleInputChange}
                    value={infoData.class}
                  >
                    <option value="Thường dân">Thường dân</option>
                    <option value="Ma tu">Ma tu</option>
                    <option value="Chính đạo">Chính đạo</option>
                  </select>
                </div>
                <PrimaryButton
                  type="submit"
                  onClick={handleSubmit}
                  title="Lưu thay đổi"
                  color="blue"
                />
              </Col>
            </div>
          </Col>

          <Col sizeXs={3}>
            <div className={cx("file-uploader")}>
              <span>Avatar</span>
              <img
                src={
                  user?.imgSrc ? user.imgSrc : "/images/anonymous/anonymous.png"
                }
                alt="avatar"
              />

              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PrimaryButton title="Upload ảnh" color="red" type="button" />
              </div>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className={cx("preview")}
                />
              )}
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default UserProfile;
