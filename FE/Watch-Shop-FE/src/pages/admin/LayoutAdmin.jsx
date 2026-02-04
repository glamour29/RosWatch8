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
      <div className='flex min-h-screen'>
        <div className='w-380px flex-shrink-0 fixed top-0 left-0 h-full'>
          <Siderbar />
        </div>
        <div className='ml-380px flex-1 min-w-0 p-10 overflow-x-hidden'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
