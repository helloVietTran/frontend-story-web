import { useEffect } from "react";
import { useSelector } from "react-redux";

import NavBarModal from "@/components/Modal/NavBarModal/NavBarModal";
import Head from "@/components/Head/Head";
import NavBar from "@/components/NavBar/NavBar";
import Register from "@/components/Register/Register";
import Footer from "@/components/Footer/Footer";

function RegisterPage() {
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
          <Register />
          <Footer />
        </>
      )}
    </>
  );
}

export default RegisterPage;
