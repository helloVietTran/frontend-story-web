import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import toast from "react-hot-toast";

import BreadCumb from "@/components/BreadCumb/BreadCumb";
import SecondaryHeading from "../Heading/SecondaryHeading/SecondaryHeading";
import SubmitButton from "@/components/Button/SubmitButton/SubmitButton";
import Input from "../Input/Input";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Container from "../Layout/Container/Container";
import Grid from "../Layout/Grid/Grid";
import Row from "../Layout/Row/Row";
import Col from "../Layout/Col/Col";

import useTheme from "@/customHook/useTheme";
import styles from "./Login.module.scss";
import { login } from "@/api/authApi";
import { login as loginAction } from "@/redux/authSlice";

const cx = classNames.bind(styles);

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeClassName = useTheme(cx);

  const toastStyles = {
    fontSize: "14px",
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(loginAction(data));
      navigate("/");
    },
    onError: (error) => {
      toast.error(
        "Đăng nhập thất bại! \nVui lòng kiểm tra lại tài khoản hoặc mật khẩu.",
        {
          style: toastStyles,
        }
      );
    },
    onMutate: () => {
      toast.loading("Đang xử lý", {
        style: toastStyles,
        id: 'loading'
      }
  
    );
    },

    onSettled: () => {
      toast.dismiss("loading");
    },
  });

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
    loginMutation.mutate(data);
  };

  return (
    <div className={`${cx("login")} ${themeClassName}`}>
      <DefaultLayout>
        <Container isBackgroundVisible shouldApplyPadding>
          <BreadCumb />
          <Grid>
            <Row>
              <Col sizeXs={12} sizeMd={6} offsetMd={3}>
                <div className={cx("login-form")}>
                  <SecondaryHeading bottom={20} title="Đăng nhập" size={2.2} />
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
                      <SubmitButton type="normal" title="Đăng nhập" />
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
        </Container>
      </DefaultLayout>
    </div>
  );
}

export default Login;
