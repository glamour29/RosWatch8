import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/client/Header';
import Footer from '../../components/client/Footer';

const LayoutClient = () => {
  return (
    <>
      <Header />
      <div className='min-h-[611px]'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default LayoutClient;
