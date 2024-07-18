import React, { useState } from "react";
import classname from "classnames/bind";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import styles from "./ChangePassword.module.scss";
import useTheme from "@/customHook/useTheme";
import Input from "@/components/Input";
import { authApi } from "@/config/api";
import { SecondaryHeading } from "@/components/Heading";
import { PrimaryButton } from "@/components/Button";

const cx = classname.bind(styles);

function ChangePassWord() {
  const themeClassName = useTheme(cx);

  const { userData } = useSelector((state) => state.auth);
  const [setPassword] = useState("");
  const [setNewPassword] = useState("");
  const [isOpenResult, setIsOpenResult] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues: {
      newPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const handleSubmitData = async (data) => {
    try {
      const res = await authApi.changePassword({
        ...data,
        userId: userData._id,
      });
      if (res.status === 200) {
        setIsOpenResult(true);
      }
    } catch (error) {
      console.log(error);
      console.log("Cant changed password");
    }
  };

  return (
    <div className={`${cx("change-password")} ${themeClassName}`}>
      <SecondaryHeading size={2.2} title="Đổi mật khẩu" bottom={20} />

      <form onSubmit={handleSubmit(handleSubmitData)} className="submit-form">
        <Input
          label="Mật khẩu"
          id="password"
          type="text"
          placeholder="Nhập mật khẩu"
          register={register}
          config={{
            required: "Chưa nhập mật khẩu",
            pattern: {
              required: "Mật khẩu không được để trống",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
                message:
                  "Mật khẩu không chứa kí tự đặc biệt và phải bao gồm cả chữ và số",
              },
              minLength: {
                value: 6,
                message: "Mật khẩu phải dài 6-16 kí tự",
              },
              maxLength: {
                value: 12,
                message: "Mật khẩu dài 6-12 kí tự",
              },
            },
          }}
          errors={errors}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Mật khẩu mới"
          id="newPassword"
          type="password"
          placeholder="Nhập mật khẩu mới"
          register={register}
          config={{
            required: "Nhập lại mật khẩu",
            validate: (value) =>
              value !== getValues("password") ||
              "Mật khẩu mới không được giống mật khẩu cũ",
          }}
          errors={errors}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          label="Nhập lại mật khẩu mới"
          id="newPassword"
          type="password"
          placeholder="Nhập lại mật khẩu mới"
          register={register}
          config={{
            required: "Nhập lại mật khẩu",
            validate: (value) =>
              value !== getValues("newPassword") ||
              "Nhập lại mật khẩu mới không khớp",
          }}
          errors={errors}
        />
        <div className="mt20" >
          <PrimaryButton 
            type='submit'
            title='Đổi mật khẩu'
            color= 'blue'
          />
        </div>

        {isOpenResult && (
          <div className="notifybox">
            <div className="success">
              "Đổi mật khẩu thành công"
              <span class="close" onClick={() => setIsOpenResult(false)}>
                ×
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default ChangePassWord;
