import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import BreadCumb from "@/components/BreadCumb/BreadCumb";
import Container from "@/components/Layout/Container/Container";
import PrimaryButton from "@/components/Button/PrimaryButton/PrimaryButton";
import Input from "@/components/Input/Input";
import Grid from "@/components/Layout/Grid/Grid";
import Col from "@/components/Layout/Col/Col";
import Row from "@/components/Layout/Row/Row";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import styles from "./ResetPassword.module.scss";
import { resetPassword } from "@/api/userApi";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);

function ResetPassword({ token, userId }) {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");

  const style = {
    fontSize: "14px",
  };

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Thay đổi mật khẩu thành công!", {
        style,
      });
      navigate("/login");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra.\n Vui lòng thử lại!", {
        style,
      });
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const handleSubmitData = async (data) => {
    resetPasswordMutation.mutate({
      password: data.newPassword,
      confirmPassword: data.confirmNewPassword,
      token,
      userId,
    });
  };

  return (
    <DefaultLayout>
      <Container shouldApplyPadding isBackgroundVisible>
        <BreadCumb />

        <form
          onSubmit={handleSubmit(handleSubmitData)}
          className={cx("resetPassword")}
        >
          <Grid>
            <Row>
              <Col sizeXs={12} sizeMd={6} offsetMd={3}>
                <Input
                  label="Mật khẩu"
                  id="newPassword"
                  type="text"
                  placeholder="Nhập mật khẩu mới"
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
                        message: "Mật khẩu dài 6-20 kí tự",
                      },
                    },
                  }}
                  onChange={(e) => setNewPassword(e.target.value)}
                  errors={errors}
                />

                <Input
                  label="Nhập lại mật khẩu mới"
                  id="confirmNewPassword"
                  type="text"
                  placeholder="Nhập lại mật khẩu"
                  register={register}
                  config={{
                    required: "Nhập lại mật khẩu",
                    validate: (value) =>
                      value === getValues("newPassword") ||
                      "Nhập lại mật khẩu không chính xác",
                  }}
                  errors={errors}
                />
                <PrimaryButton
                  title="Xác nhận"
                  type="submit"
                  color="blue"
                  style={{
                    marginTop: "8px",
                  }}
                />
              </Col>
            </Row>
          </Grid>
        </form>
      </Container>
    </DefaultLayout>
  );
}

ResetPassword.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ResetPassword;
