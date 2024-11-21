import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlinePhone } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { BiArrowFromLeft } from 'react-icons/bi';
import logo from '../../assets/img/LogoRosWatch.png';
import Navbar from './Navbar';
import { AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai';

const menuAvatar = [{ to: '/client/profile', text: 'Profile' }];

const Header = () => {
  const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const counterCart = useSelector((state) => state.counterCart.value);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    token && setIsLoggedIn(!isLoggedIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setIsLoggedIn(!isLoggedIn);
    navigate('/client/home');
  };

  const renderMenuAvatar = () => {
    return menuAvatar.map((item, index) => {
      return (
        <li
          key={index}
          className='p-2 hover:bg-red-100 transition-all duration-200 ease-in-out'
        >
          <Link
            to={item.to}
            className='block'
          >
            {item.text}
          </Link>
        </li>
      );
    });
  };

  return (
    <header className='bg-main-red'>
      <div className='w-container h-header mx-auto flex items-center justify-between border-b-2'>
        <div className='text-white text-2xl font-semibold flex items-center'>
          <div className='w-16 h-16 mr-2 flex items-center justify-center border border-white rounded-full'>
            <img
              src={logo}
              alt='logo'
              srcSet=''
              className='w-20 h-20'
            />
          </div>
          <p className='text-xl font-bold'>
          <span style={{ textDecoration: 'underline', transform: 'rotate(-5deg)' }}>R</span>
          <span style={{ transform: 'rotate(5deg)' }}>O</span>
          <span style={{ textDecoration: 'underline', transform: 'rotate(-5deg)' }}>S</span>
          <span style={{ transform: 'rotate(5deg)' }}> </span>
          <span style={{ textDecoration: 'underline', transform: 'rotate(-5deg)' }}>W</span>
          <span style={{ transform: 'rotate(5deg)' }}>A</span>
          <span style={{ textDecoration: 'underline', transform: 'rotate(-5deg)' }}>T</span>
          <span style={{ transform: 'rotate(5deg)' }}>C</span>
          <span style={{ textDecoration: 'underline', transform: 'rotate(-5deg)' }}>H</span>
          </p>
        </div>
        <div>
          {isLoggedIn ? (
            <div className='flex items-center relative'>
              <FaShoppingCart
                className='mr-4 text-white text-3xl cursor-pointer hover:opacity-85'
                onClick={() => navigate('/client/cart')}
              />
              <span
                className='absolute top-0 right-12 bg-white rounded-full text-xs text-center font-semibold
                w-5 h-5 leading-4 border-2 border-main-red'
              >
                {counterCart}
              </span>
              <div
                className='w-10 bg-white rounded-full border-2 border-white relative'
                onMouseEnter={() => setIsHoveredAvatar(true)}
                onMouseLeave={() => setIsHoveredAvatar(false)}
              >
                <img
                  src='/profile.svg'
                  alt='profile'
                />
                {isHoveredAvatar && (
                  <div className='absolute top-5 right-0 z-50 transition-all duration-200 ease-in-out'>
                    <ul className='bg-white shadow-2xl w-36 rounded-md mt-5 overflow-hidden'>
                      {renderMenuAvatar()}
                      <hr />
                      <li className='p-2 hover:bg-red-100 transition-all duration-200 ease-in-out block cursor-pointer font-bold'>
                        <button
                          onClick={handleLogout}
                          className='flex items-center'
                        >
                          <BiArrowFromLeft className='text-red-500' />
                          <p className='ml-2'>Logout</p>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='flex'>
              <Link
                to='/login'
                className='flex ml-3 bg-slate-100 text-main-red py-2 px-4 rounded-md hover:bg-slate-300 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 font-bold'
              >
                Login
                <AiOutlineUser />
              </Link>
              <Link
                to='/register'
                className='flex ml-3 bg-slate-100 text-main-red py-2 px-4 rounded-md hover:bg-slate-300 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 font-bold'
              >
                Register
                <AiOutlineUsergroupAdd />
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className='w-container py-3 mx-auto flex items-center text-white justify-between'>
        <div>
          <Navbar />
        </div>
        <div className='flex'>
          <AiOutlinePhone className='w-8 h-7' />
          <span className='text-white text-lg font-semibold'>Hotline: +84 968794894</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
