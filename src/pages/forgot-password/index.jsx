import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { NavBarModal } from "../../components/Modal";
import { authApi } from "../../config/api";
import Head from "../../components/Head";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import BreadCumb from "../../components/BreadCumb";
import { Container, Grid, Row, Col } from "../../components/Layout";

function ForgotPassword() {
  const isOpen = useSelector((state) => state.navbar.isOpen);

  const [receivedEmail, setReceivedEmail] = useState("");
  const [notExistEmail, setNotExistEmail] = useState(false);
  const [existEmail, setExistEmail] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const handleSubmitData = async (data) => {
    try {
      authApi.forgotPassword(data);
      setReceivedEmail(data.email);
      setExistEmail(true);
    } catch (error) {
      setNotExistEmail(true);
      console.log(error);
    }
  };
  return (
    <>
      <Head />
      {isOpen ? (
        <NavBarModal />
      ) : (
        <>
          <NavBar />
          <Container isBackgroundVisible shouldApplyPadding>
            <BreadCumb />
            <Grid>
              <Row>
                <Col sizeLg={6} offset={25}>
                  <form
                    onSubmit={handleSubmit(handleSubmitData)}
                    className="submit-form"
                  >
                    <div>
                      <label htmlFor="email" className="bold">
                        Vui lòng nhập email
                      </label>
                      <input
                        type="text"
                        placeholder="VD abc@gmail.com"
                        {...register("email", {
                          required: "Chưa nhập email",
                          pattern: {
                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                            message: "Email không hợp lệ",
                          },
                        })}
                        className={errors.email ? "invalid" : "validate"}
                      />
                      {errors.email && (
                        <span className="error">{errors.email.message}</span>
                      )}
                    </div>
                    <button className="btn btn-primary mt15 mb15" type="submit">
                      Xác nhận
                    </button>
                    {notExistEmail && (
                      <div className="alert alert-danger">
                        <span>Không tìm thấy email</span>
                      </div>
                    )}
                    {existEmail && (
                      <div className="alert alert-success">
                        <p>
                          Email đã được gởi đến {receivedEmail}. Vui lòng kiểm
                          tra email để tiếp tục bước tiếp theo.
                        </p>
                      </div>
                    )}
                  </form>
                </Col>
              </Row>
            </Grid>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
}

export default ForgotPassword;
