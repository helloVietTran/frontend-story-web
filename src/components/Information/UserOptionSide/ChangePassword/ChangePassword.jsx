import React, { useState } from "react";
import classname from "classnames/bind";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Input from "@/components/Input/Input";
import SecondaryHeading from "@/components/Heading/SecondaryHeading/SecondaryHeading";
import PrimaryButton from "@/components/Button/PrimaryButton/PrimaryButton";

import styles from "./ChangePassword.module.scss";
import useTheme from "@/customHook/useTheme";
import { changePassword } from "@/api/userApi";
import toast from "react-hot-toast";

const cx = classname.bind(styles);

function ChangePassWord() {
  const themeClassName = useTheme(cx);
  const [password, setPassword] = useState("");
  // define mutationFn
  const toastStyles = {
    fontSize: '14px'
  }
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: ()=> {
      toast.success("Thay đổi mật khẩu thành công", {
        style: toastStyles
      })
    },
    onError: ()=> {
      toast.error("Vui lòng thử lại sau ít phút", {
        style: toastStyles
      })
    },
    onMutate: ()=> {
      toast.loading("Vui lòng thử lại sau ít phút", {
        style: toastStyles,
        id: "loading"
      })
    },
    onSettled: () => {
      toast.dismiss("loading")
    }
  })

  //config useForm
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
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmitData = async (data) => {
    changePasswordMutation.mutate(data)
  };

  return (
    <div className={`${cx("change-password")} ${themeClassName}`}>
      <SecondaryHeading size={2.2} title="Đổi mật khẩu" bottom={20} />

      <form onSubmit={handleSubmit(handleSubmitData)} className="submit-form">
        <Input
          label="Mật khẩu"
          id="oldPassword"
          type="password"
          placeholder="Nhập mật khẩu"
          register={register}
          config={{
            required: "Chưa nhập mật khẩu",
            pattern: {
              required: "Mật khẩu không được để trống",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
                message:
                  "Mật khẩu không chứa kí tự đặc biệt và phải bao gồm cả chữ và số",
              },
              minLength: {
                value: 6,
                message: "Mật khẩu phải dài 6-20 kí tự",
              },
              maxLength: {
                value: 20,
                message: "Mật khẩu phải dài 6-20 kí tự",
              },
            },
          }}
          errors={errors}
        />
        <Input
          label="Mật khẩu"
          id="password"
          type="password"
          placeholder="Nhập mật khẩu mới"
          register={register}
          config={{
            required: "Chưa nhập mật khẩu mới",
            pattern: {
              required: "Mật khẩu mớ không được để trống",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
                message:
                  "Mật khẩu mới không chứa kí tự đặc biệt và phải bao gồm cả chữ và số",
              },
              minLength: {
                value: 6,
                message: "Mật khẩu mới phải dài 6-20 kí tự",
              },
              maxLength: {
                value: 20,
                message: "Mật khẩu mới phải dài 6-20 kí tự",
              },
            },
          }}
          errors={errors}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          label="Nhập lại mật khẩu"
          id="confirmPassword"
          type="password"
          placeholder="Nhập lại mật khẩu"
          register={register}
          config={{
            required: "Nhập lại mật khẩu",
            validate: (value) =>
              value === getValues("password") ||
              "Nhập lại mật khẩu mới không chính xác",
          }}
          errors={errors}
        />
        <div className="mt20">
          <PrimaryButton type="submit" title="Đổi mật khẩu" color="blue" />
        </div>
      </form>
    </div>
  );
}

export default ChangePassWord;
