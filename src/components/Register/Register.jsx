import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import classNames from "classnames/bind";

import SecondaryHeading from "../Heading/SecondaryHeading/SecondaryHeading";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Grid from "../Layout/Grid/Grid";
import Row from "../Layout/Row/Row";
import Col from "../Layout/Col/Col";
import Container from "../Layout/Container/Container";
import SubmitButton from "@/components/Button/SubmitButton/SubmitButton";
import Input from "../Input/Input";
import BreadCumb from "@/components/BreadCumb/BreadCumb";

import { createUser } from "@/api/userApi";
import { login as loginAction } from "@/redux/authSlice";
import styles from "./Register.module.scss";
import useTheme from "../../customHook/useTheme";

const cx = classNames.bind(styles);

function Register() {
  const themeClassName = useTheme(cx);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [password, setPassword] = useState(""); // để so sánh repassword với password

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      toast.success("Đăng ký thành công!", {
        style:{
          fontSize: '14px'
        },
        duration: 3000,
        position: "top-center",
      });

      dispatch(loginAction(data))  
      navigate("/")
    },
    onError: (error) => {
      toast.error("Tài khoản đã tồn tại!", {
        style:{
          fontSize: '14px'
        },
        duration: 3000,
        position: "top-center",
      });
    },
  });


  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  // submit form and login
  const handleSubmitData = async (data) => {
    createUserMutation.mutate(data);
  };

  return (
    <DefaultLayout>
      <Container 
        shouldApplyPadding 
        isBackgroundVisible
      >
        <div className={cx("register", themeClassName)}>
          <BreadCumb />
          <Grid>
            <Row>
              <Col sizeXs={12} sizeMd={6} offsetMd={3}>
                <div className={cx("register-form")}>
                  <form
                    onSubmit={handleSubmit(handleSubmitData)}
                    className="submit-form"
                  >
                    <SecondaryHeading title="Đăng kí" bottom={20} size={2.2} />

                    <Input
                      label="Tên tài khoản"
                      id="name"
                      type="text"
                      placeholder="Nhập tài khoản"
                      register={register}
                      config={{
                        required: "Tài khoản không được để trống",
                        minLength: {
                          value: 6,
                          message: "Tài khoản dài 6-16 kí tự",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: "Tài khoản không được chứa kí tự đặc biệt",
                        },
                        maxLength: {
                          value: 16,
                          message: "Tài khoản dài 6-16 kí tự",
                        },
                      }}
                      errors={errors}
                    />

                    <Input
                      label="Email"
                      id="email"
                      type="text"
                      placeholder="VD abc@gmail.com"
                      register={register}
                      config={{
                        required: "Chưa nhập email",
                        pattern: {
                          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                          message: "Email không hợp lệ",
                        },
                      }}
                      errors={errors}
                    />

                    <Input
                      label="Mật khẩu"
                      id="password"
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
                            message: "Mật khẩu dài 6-20 kí tự",
                          },
                        },
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                      errors={errors}
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
                          "Nhập lại mật khẩu không chính xác",
                      }}
                      errors={errors}
                    />

                    <div className={cx("register-action")}>
                      Có tài khoản?
                      <Link to={"/login"} className="ml10">
                        Đăng nhập ngay
                      </Link>
                    </div>
                    <div>
                      <SubmitButton type="normal" title="Đăng kí" />
                      <SubmitButton
                        type="google"
                        title="Đăng nhập với tài khoản Google"
                      />
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </Container>
    </DefaultLayout>
  );
}

export default Register;
