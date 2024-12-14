import { useEffect } from "react";
import { useSelector } from "react-redux";

import NavBarModal  from "@/components/Modal/NavBarModal/NavBarModal";
import NavBar from "@/components/NavBar/NavBar";
import Head from "@/components/Head/Head";
import Footer from "@/components/Footer/Footer";
import UserDetail from "@/components/UserDetail/UserDetail";

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
