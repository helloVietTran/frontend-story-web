import { useEffect } from "react";
import { useSelector } from "react-redux";

import NavBarModal from "@/components/Modal/NavBarModal/NavBarModal";
import NavBar from "@/components/NavBar/NavBar";
import Head from "@/components/Head/Head";
import Footer from "@/components/Footer/Footer";
import Information from "@/components/Information/Infomation";

function InfomationPage() {
  const { isOpen } = useSelector((state) => state.navbar.isOpen);
  
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
