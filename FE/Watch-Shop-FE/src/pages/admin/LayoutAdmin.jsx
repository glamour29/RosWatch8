import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Siderbar from '../../components/admin/Siderbar';

const LayoutAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminId = localStorage.getItem('admin_id');
    adminId || navigate('/login');
  });

  return (
    <>
      <div className='flex'>
        <div className='w-380px fixed top-0 left-0'>
          <Siderbar />
        </div>
        <div className='ml-380px p-10 w-full'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
