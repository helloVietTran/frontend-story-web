import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ForgotPassword from '@/components/ForgotPassword/ForgotPassword';
import Head from '@/components/Head/Head';
import NavBarModal from '@/components/Modal/NavBarModal/NavBarModal';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

const ForgotPasswordPage = () => {
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
          <ForgotPassword />
          <Footer />
        </>
        )}
    </>
  )
}

export default ForgotPasswordPage