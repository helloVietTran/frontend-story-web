import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SyncLoader } from "react-spinners";
import { useSelector } from "react-redux";

import BreadCumb from "../BreadCumb";
import styles from "./Login.module.scss";
import { SecondaryHeading } from "../Heading";
import { DefaultLayout, Container, Grid, Row, Col } from "../Layout";
import {SubmitButton} from "../Button";
import { login } from "@/actions/auth";
import Input from "../Input";
import useTheme from "@/customHook/useTheme";

const cx = classNames.bind(styles);
function Login() {
  const themeClassName = useTheme(cx);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(()=> {
    if(isAuthenticated){
      navigate("/");
    }
  }, []) 

  const [loginFailedMess, setLoginFailedMess] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitData = async (data) => {
    try {
      setLoading(true);
      await dispatch(login(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setLoginFailedMess(true);
    }
  };

  return (
    <div className={`${cx("login")} ${themeClassName}`}>
      {loading ? (
        <div className={cx("loading")}>
          <SyncLoader color="#d6ab36" loading={true} />
          <h2>Vui lòng chờ đợi trong giây lát!</h2>
          <span>Hệ thống sẽ tự động chuyển hướng</span>
        </div>
      ) : (
        <DefaultLayout>
          <Container isBackgroundVisible shouldApplyPadding>
            <BreadCumb />
            <Grid>
              <Row>
                <Col sizeXs={12} sizeMd={6} offsetMd={3}>
                  <div className={cx("login-form")}>
                    <SecondaryHeading
                      bottom={20}
                      title="Đăng nhập"
                      size={2.2}
                    />
                    <form
                      onSubmit={handleSubmit(handleSubmitData)}
                      className="submit-form"
                    >
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
                        label="Password"
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
                        errors={errors}
                      />
                
                      <div className={cx("login-action")}>
                        <Link to={"/forgot-password"}>Quên mật khẩu</Link>
                        <Link to={"/register"} className="ml10">
                          Đăng kí mới
                        </Link>
                      </div>

                      <div>
                        <SubmitButton 
                          type="normal"
                          title="Đăng nhập"
                        />
                        <SubmitButton 
                          type="google"
                          title="Đăng nhập với tài khoản Google"
                        />
                      </div>
                    </form>

                    {loginFailedMess && (
                      <p className="alert alert-danger">
                        Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc
                        mật khẩu.
                      </p>
                    )}

                  </div>
                </Col>
              </Row>
            </Grid>
          </Container>
        </DefaultLayout>
      )}
    </div>
  );
}

export default Login;
