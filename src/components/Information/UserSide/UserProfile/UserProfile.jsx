import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import classname from "classnames/bind";
import axios from "axios";
import io from "socket.io-client";

import { updateUser } from "@/actions/auth";
import { userApi } from "@/config/api";
import { SecondaryHeading } from "@/components/Heading";
import { Row, Col } from "@/components/Layout";
import { PostHeading } from "@/components/Heading";
import { PrimaryButton } from "@/components/Button";


import useTheme from "@/customHook/useTheme";
import styles from "./UserProfile.module.scss";

const cx = classname.bind(styles);

function UserProfile() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const themeClassName = useTheme(cx);

  const [infoData, setInfoData] = useState({
    newUserName: "",
    newSurName: "",
    sex: "",
    class: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchUser = useCallback(async () => {
    try {
      const res = await userApi.getCurrentUser();
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  //real time
  useEffect(()=> {
    const socket = io(backendUrl);
    socket.on("update user", ({user}) => {
      setUser(user);
      dispatch(updateUser(user));
      selectedImage(null);
      setInfoData({
        newUserName: "",
        newSurName: "",
        sex: "",
        class: "",
      });
    })
    return () => {
      socket.disconnect();
    };
  }, [])


  // config useDropzone
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

  const uploadFile = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", "avatar_preset");
      const res = await axios.post(process.env.REACT_APP_UPLOAD_URL, formData);
      const fileUrl = res.data.secure_url;
      return fileUrl;

    } else {
      return;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfoData({ ...infoData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = await uploadFile();    
      const updatedInfoData = { ...infoData, imgSrc: url || "" };  
      await userApi.updateUser(updatedInfoData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("user-profile", themeClassName)}>
      <SecondaryHeading size={2.2} bottom={20} title="Thông tin người dùng" />
      <Row>
        <Col sizeXs={9}>
          <PostHeading title="Cập nhật tài khoản" isRequired bottom={15} />

          <div className="form-group">
            <label htmlFor="userName" className="control-label">
              Tên người dùng
            </label>
            <input
              name="userName"
              value={user.name || ""}
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
              value={user.email || ""}
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
                    value={infoData.newUserName || ""}
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
                    value={infoData.newSurName || ""}
                    name="newSurName"
                    placeholder="Họ"
                    className="form-control mt5 "
                  />
                </div>
              </Col>
            </Row>

            <Col sizeXs={12}>
              <div className="form-group">
                <label htmlFor="sex" className="control-label">
                  Giới tính<span>*</span>
                </label>
                <select
                  name="sex"
                  placeholder="Giới tính"
                  className="form-control mt5"
                  onChange={handleInputChange}
                  value={infoData.sex || ""}
                >
                  <option value></option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
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
                  value={infoData.class || ""}
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
                user?.imgSrc
                  ? user.imgSrc
                  : "/images/anonymous/anonymous.png"
              }
              alt="avatar"
            />

            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <PrimaryButton 
                title="Upload ảnh"
                color="red"
                type="button"
              />
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
    </div>
  );
}

export default UserProfile;
