import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import { SecondaryHeading } from "../Heading";
import { DefaultLayout, Container, Grid, Row, Col } from "../Layout";
import { SubmitButton } from "../Button";
import { authApi } from "../../config/api";
import Input from "../Input";
import BreadCumb from "../BreadCumb";
import styles from "./Register.module.scss";
import useTheme from "../../customHook/useTheme";
import { EnterOTPModal } from "../Modal";

const cx = classNames.bind(styles);

function Register() {
  const themeClassName = useTheme(cx);
  const [isOpenOTPModal, setIsOpenOTPModal] = useState(false);
  const [password, setPassword] = useState(""); // để so sánh repassword với password

  useEffect(()=> {
    const verifyExpires = localStorage.getItem("verifyExpires") || "";
    if(!verifyExpires) return;
    if(JSON.parse(verifyExpires) < Date.now()){
      localStorage.removeItem("verifyExpires");
      return;
    }
    setIsOpenOTPModal(true);
  }, [setIsOpenOTPModal]);

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
  const handleSubmitData = async (data) => {
    localStorage.setItem("email", data.email);
    try {
      await authApi.register(data);
      localStorage.setItem("verifyExpires", JSON.stringify(Date.now() + 5*60*1000));
      setIsOpenOTPModal(true);
    } catch (error) {
      console.log("cant create new account");
    }
  };

  return (
    <DefaultLayout>
      <Container shouldApplyPadding isBackgroundVisible>
       {
        isOpenOTPModal &&
        <EnterOTPModal 
          setIsOpenOTPModal={setIsOpenOTPModal} 
          isOpenOTPModal={isOpenOTPModal}
        />
       }
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
                      id="userName"
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
                        required: "Chưa nhập email",
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
                      onChange={(e) => setPassword(e.target.value) }
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
