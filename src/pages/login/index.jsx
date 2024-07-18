import { useEffect } from "react";
import { useSelector } from "react-redux";

import { NavBarModal } from "../../components/Modal";
import Head from "../../components/Head";
import NavBar from "../../components/NavBar";
import Login from "../../components/Login";
import Footer from "../../components/Footer";
function LoginPage() {
  const isOpen = useSelector((state) => state.navbar.isOpen);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Head />
      {isOpen ? (
        <NavBarModal />
      ) : (
        <>
          <NavBar />
          <Login />
          <Footer />
        </>
      )}
    </>
  );
}

export default LoginPage;
