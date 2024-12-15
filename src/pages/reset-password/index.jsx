import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBarModal  from "@/components/Modal/NavBarModal/NavBarModal";
import Head from "@/components/Head/Head";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import BreadCumb from "@/components/BreadCumb/BreadCumb";
import Container from "@/components/Layout/Container/Container";

function ResetPassword() {
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.navbar.isOpen);

  const [newPassword, setNewPassword] = useState("");
  const [searchParams] = useSearchParams();

  const ticket = searchParams.get("ticket");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    
  };

  return (
    <>
      <Head />
      {isOpen ? (
        <NavBarModal />
      ) : (
        <>
          <NavBar />
          <Container shouldApplyPadding isBackgroundVisible>
            <BreadCumb />
            <div className="row">
              <div className="col l-6 offset-25">
                <form
                  onSubmit={handleSubmit(handleSubmitData)}
                  className="submit-form"
                >
                  <div className="new-password">
                    <label htmlFor="newPassword">Mật khẩu mới</label>
                    <input
                      type="newPassword"
                      placeholder="Mật khẩu có ít nhất 6 kí tự"
                      {...register("newPassword", {
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
                      })}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={errors.newPassword ? "invalid" : "validate"}
                    />
                    {errors.newPassword && (
                      <span className="error">
                        {errors.newPassword.message}
                      </span>
                    )}
                  </div>

                  <div className="re-password">
                    <label htmlFor="re-password">Nhập lại mật khẩu mới</label>
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      {...register("rePassword", {
                        required: "Nhập lại mật khẩu",
                        validate: (value) =>
                          value === getValues("newPassword") ||
                          "Nhập lại mật khẩu không chính xác",
                      })}
                      className={errors.rePassword ? "invalid" : "validate"}
                    />
                    {errors.rePassword && (
                      <span className="error">{errors.rePassword.message}</span>
                    )}
                  </div>
                  <button className="btn btn-primary mt15 mb15" type="submit">
                    Xác nhận
                  </button>
                </form>
              </div>
            </div>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
}

export default ResetPassword;
