import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import Button from '../../components/Button';
import OrderDetailItem from '../../components/client/OrderDetailItem';
import requestHandler from '../../utils/requestHandle';
import { lamTronGia, isUserLogin, formatPhoneNumber } from '../../utils/functionCommon';
import { setCountCart } from '../../utils/counterCartSlice';

const INIT_USER = {
  id: 0,
  address: '',
  birthDate: '',
  email: '',
  fullName: '',
  phone: '',
  roles: '',
  delete: false,
};

const OrderDetail = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(INIT_USER);
  const [typePayment, setTypePayment] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    isUserLogin() || navigate('/login');

    window.scrollTo(0, 0);
    fetchCart();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const user_Id = JSON.parse(localStorage.getItem('user_id'));
    try {
      const response = await requestHandler.get(`users/${user_Id}`);
      const data = await response.data.data;
      setUser(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await requestHandler.get('cart/');
      const data = await response.data.data;
      setCart(data);
    } catch (error) {
      console.log('error cart');
    }
  };

  const handleChangeTypePayment = (e) => {
    setTypePayment(Number(e.target.value));
  };

  const caculateTotalPrice = cart.reduce((preValue, curValue) => {
    const { price, discount } = curValue.products;
    return preValue + curValue.quantity * (price - (price * discount) / 100);
  }, 0);

  const handlerThanhToan = async () => {
    try {
      if (typePayment === 1) {
        const idUser = Number(localStorage.getItem('user_id'));
        const orderReqDTO = { userId: idUser, status: 'waiting', total: caculateTotalPrice };

        await requestHandler.post('order/', orderReqDTO);
        await requestHandler.delete(`cart/all/${idUser}`);
        const response = await requestHandler.get('cart/');
        const carts = await response.data.data;
        dispatch(setCountCart(carts.length));

        Swal.fire('Thanh toán thành công', '', 'success');
        navigate('/client/');
      } else {
        const returnPath = '/#/client/order-success';
        const baseUrl = process.env.REACT_APP_VNPAY_RETURN_BASE || window.location.origin;
        const dataReq = {
          total: caculateTotalPrice,
          urlReturn: `${baseUrl}${returnPath}`,
        };
        const response = await requestHandler.post('vn-pay/create-payment', dataReq);
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderItemDetail = () => {
    return cart.map((item, index) => (
      <OrderDetailItem
        key={index}
        item={item}
      />
    ));
  };

  return (
    <>
      <h2 className='text-3xl text-center font-bold py-5'>Chi Tiết Đơn Hàng</h2>

      <div className='w-container p-10 mx-auto shadow-xl rounded-xl'>
        <div className='flex my-2'>
          <h3 className='font-bold basis-1/6'>Tên:</h3>
          <p className='basis-5/6'>{user.fullName}</p>
        </div>
        <div className='flex my-2'>
          <h3 className='font-bold basis-1/6'>Ngày sinh:</h3>
          <p className='basis-5/6'>{user.birthDate}</p>
        </div>
        <div className='flex my-2'>
          <h3 className='font-bold basis-1/6'>Địa chỉ:</h3>
          <p className='basis-5/6'>{user.address}</p>
        </div>
        <div className='flex my-2'>
          <h3 className='font-bold basis-1/6'>Email:</h3>
          <p className='basis-5/6'>{user.email}</p>
        </div>
        <div className='flex my-2'>
          <h3 className='font-bold basis-1/6'>Số điện thoại:</h3>
          <p className='basis-5/6'>{formatPhoneNumber(user.phone)}</p>
        </div>
        <div className='text-end'>
          <button
            className='bg-orange-400 text-white px-3 py-2 rounded-lg hover:bg-orange-300'
            onClick={() => navigate('/client/profile')}
          >
            Thay đổi thông tin cá nhân
          </button>
        </div>
      </div>

      <div className='w-container px-10 mx-auto shadow-xl rounded-xl mb-10'>
        <div>{renderItemDetail()}</div>
        <div className='text-end font-bold'>Tổng tiền: {lamTronGia(caculateTotalPrice)} VND</div>
        <div className='text-end my-4'>
          <span className='font-bold'>Chọn phương thức thanh toán: </span>
          <select
            className='border-2 border-red-300 border-solid outline-none rounded-md'
            value={typePayment}
            onChange={handleChangeTypePayment}
          >
            <option value='1'>Thanh toán khi nhận hàng</option>
            <option value='2'>Thanh toán online</option>
          </select>
        </div>
        <div className='text-end py-5'>
          <Button onClick={() => navigate('/client/cart')}>Trở lại</Button>
          <Button
            backGroundColor='main-black'
            color='white'
            disabled={cart.length === 0}
            onClick={handlerThanhToan}
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
