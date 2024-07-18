import { useEffect } from "react";
import { useSelector } from "react-redux";

import { NavBarModal } from "../../components/Modal";
import NavBar from "../../components/NavBar";
import Head from "../../components/Head";
import Footer from "../../components/Footer";
import Information from "../../components/Information";

function InfomationPage() {
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
          <Information />
          <Footer />
        </>
      )}
    </>
  );
}

export default InfomationPage;
