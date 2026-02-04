import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlinePhone } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowFromLeft } from 'react-icons/bi';
import logo from '../../assets/img/LogoRosWatch.png';
import Navbar from './Navbar';
import { AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { setCountCart } from '../../utils/counterCartSlice';
import requestHandler from '../../utils/requestHandle';

const menuAvatar = [{ to: '/client/profile', text: 'Tài khoản' }];

const Header = () => {
  const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const counterCart = useSelector((state) => state.counterCart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    token && setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchCountCart = async () => {
      try {
        const response = await requestHandler.get('cart/');
        const carts = response?.data?.data;
        const count = Array.isArray(carts) ? carts.length : 0;
        dispatch(setCountCart(count));
      } catch {
        dispatch(setCountCart(0));
      }
    };
    fetchCountCart();
  }, [isLoggedIn, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    dispatch(setCountCart(0));
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
              <div className='relative inline-block'>
                <FaShoppingCart
                  className='mr-4 text-white text-3xl cursor-pointer hover:opacity-85'
                  onClick={() => navigate('/client/cart')}
                />
                <span
                  className='absolute -top-1 -right-1 bg-white rounded-full text-xs text-center font-semibold
                  min-w-[20px] h-5 px-1 leading-5 border-2 border-main-red flex items-center justify-center'
                >
                  {counterCart ?? 0}
                </span>
              </div>
              <div
                className='w-10 h-10 bg-white rounded-full border-2 border-white relative flex items-center justify-center'
                onMouseEnter={() => setIsHoveredAvatar(true)}
                onMouseLeave={() => setIsHoveredAvatar(false)}
              >
                <AiOutlineUser className='text-main-red text-2xl' aria-hidden='true' />
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
                          <p className='ml-2'>Đăng xuất</p>
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
                Đăng nhập
                <AiOutlineUser />
              </Link>
              <Link
                to='/register'
                className='flex ml-3 bg-slate-100 text-main-red py-2 px-4 rounded-md hover:bg-slate-300 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 font-bold'
              >
                Đăng ký
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
