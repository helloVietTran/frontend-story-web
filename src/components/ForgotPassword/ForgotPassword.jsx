import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import { useMutation } from "@tanstack/react-query";

import BreadCumb from "@/components/BreadCumb/BreadCumb";
import Container from "@/components/Layout/Container/Container";
import Grid from "@/components/Layout/Grid/Grid";
import Row from "@/components/Layout/Row/Row";
import Col from "@/components/Layout/Col/Col";
import Input from "@/components/Input/Input";
import PrimaryButton from "@/components/Button/PrimaryButton/PrimaryButton";
import styles from "./ForgotPassword.module.scss";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { forgotPassword } from "@/api/userApi";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const style = {
    fontSize: '14px'
  }

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: ()=> {
      toast.success("Email chứa đường dẫn reset mật khẩu đã được gửi!",{
        style
      })
    },
    onError: ()=> {
      toast.error("Đã có lỗi xảy ra. \nVui lòng thử lại sau!",{
        style
      })
    },
    onMutate: () => {
      toast.loading("Đang xử lý!",{
        style,
        id: "loading"
      });
    },
    onSettled: () => {
      toast.dismiss("loading");
    }
  });

  const handleSubmitData = async (data) => {
    forgotPasswordMutation.mutate(data);
  };
  return (
    <DefaultLayout>
      <Container isBackgroundVisible shouldApplyPadding>
        <BreadCumb />
        <Grid>
          <Row>
            <Col sizeXs={12} sizeMd={6} offsetMd={3}>
              <form
                onSubmit={handleSubmit(handleSubmitData)}
                className={cx("forgotPassword")}
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

                <PrimaryButton
                  title="Xác nhận"
                  type="submit"
                  color="blue"
                  style={{
                    marginTop: "8px",
                  }}
                />
              </form>
            </Col>
          </Row>
        </Grid>
      </Container>
    </DefaultLayout>
  );
}

export default ForgotPassword;
