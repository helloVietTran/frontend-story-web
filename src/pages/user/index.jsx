import { useEffect } from "react";
import { useSelector } from "react-redux";

import { NavBarModal } from "../../components/Modal";
import NavBar from "../../components/NavBar";
import Head from "../../components/Head";
import Footer from "../../components/Footer";
import UserDetail from "../../components/UserDetail";

function UserPage() {
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
          <UserDetail />
          <Footer />
        </>
      )}
    </>
  );
}

export default UserPage;
