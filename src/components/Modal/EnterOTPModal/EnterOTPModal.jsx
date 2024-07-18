import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import classNames from "classnames/bind";
import OTPInput from "react-otp-input";

import { authApi } from "@/config/api";
import styles from "./EnterOTPModal.module.scss";
import Countdown from "@/components/Countdown";

const cx = classNames.bind(styles);

const EnterOTPModal = ({ setIsOpenOTPModal }) => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [invalid, setInValid] = useState(false);

  const email = localStorage.getItem("email");

  const handleOTPChange = async (otp) => {
    setOTP(otp);
    if (otp.length === 6) {
      try {
        await authApi.sendOtp(email, otp);
        setIsOpenOTPModal(true);
        localStorage.removeItem("email");
        localStorage.removeItem("verifyExpires");
        navigate("/login");
      } catch (error) {
        setOTP("");
        setInValid(true);
        console.log(error);
      }
    }
  };

  // cấu hình ô nhập otp
  const totalInputs = 6;
  const renderInput = (inputProps, index) => {
    return (
      <input
        {...inputProps}
        key={index}
        style={{
          width: "60px",
          height: "80px",
          marginBottom: "10px",
          fontSize: "28px",
          textAlign: "center",
          marginRight: index === totalInputs - 1 ? "0px" : "15px",
        }}
      />
    );
  };

  const handleResendOTP = async () => {
    try {
      await authApi.resendOtp(email);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={cx("modal")}>
      <div className={cx("otp-container")}>
        <h3>Nhập mã xác thực</h3>
        <span>Mã OTP đã được gửi tới email của bạn: {email}</span>
        <div className="c-flex">
          <OTPInput
            value={otp}
            onChange={handleOTPChange}
            numInputs={6}
            separator={<span>-</span>}
            isInputNum={true}
            inputStyle={cx("otp-input")}
            renderInput={renderInput}
          />
        </div>
        <span className={cx("again")}>
          Bạn chưa nhận được mã?
          <Countdown max={10} onClick={handleResendOTP} />
        </span>
        {invalid && <p className="mt20">Mã OTP nhập sai hoặc đã hết hạn</p>}
      </div>
    </div>
  );
};
EnterOTPModal.propTypes = {
  setIsOpenOTPModal: PropTypes.func.isRequired,
};
export default EnterOTPModal;
