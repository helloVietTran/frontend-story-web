import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBarModal from "@/components/Modal/NavBarModal/NavBarModal";
import Head from "@/components/Head/Head";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import ResetPassword from "@/components/ResetPassword/ResetPassword";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.navbar.isOpen);

  const [newPassword, setNewPassword] = useState("");
  const [searchParams] = useSearchParams();

  const ticket = searchParams.get("ticket");
  const userId = searchParams.get("uid");

  useEffect(() => {
    if (!ticket) navigate("/");

    window.scrollTo(0, 0);
  }, [ticket, navigate]);

 
  return (
    <>
      <Head />
      {isOpen ? (
        <NavBarModal />
      ) : (
        <>
          <NavBar />
          <ResetPassword token={ticket} userId={userId}/>
          <Footer />
        </>
      )}
    </>
  );
}

export default ResetPasswordPage;
