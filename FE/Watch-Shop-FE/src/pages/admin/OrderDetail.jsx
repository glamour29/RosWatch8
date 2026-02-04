import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import requestHandler from '../../utils/requestHandle';
import { lamTronGia, formatPhoneNumber, getImageUrl } from '../../utils/functionCommon';
import Swal from 'sweetalert2';

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
  const [orderDetai, setOrderDetai] = useState([]);
  const [user, setUser] = useState(INIT_USER);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await requestHandler.get(`order/order-detail/${id}`);
      const data = await response.data.data;
      setOrderDetai(data);
      await fetchUser(data[0].userId);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async (idUser) => {
    try {
      const response = await requestHandler.get(`users/${idUser}`);
      const data = await response.data.data;
      setUser(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAcceptOrCancel = async (id, status) => {
    const dataReq = { orderId: id, status };
    try {
      if (status === 'cancel') {
        Swal.fire({
          title: 'Bạn có chắc muốn huỷ đơn hàng này?',
          showConfirmButton: false,
          showDenyButton: true,
          showCancelButton: true,
          denyButtonText: `Xoá`,
          cancelButtonText: 'Huỷ',
        }).then((result) => {
          if (result.isDenied) {
            requestHandler.put('order/', dataReq).then(() => navigate('/admin/orders'));
          }
        });
      } else {
        await requestHandler.put('order/', dataReq);
        navigate('/admin/orders');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const caculateTotal = (price, quantity, discount) =>
    quantity * (price - (price * discount) / 100);

  const caculateTotalPrice = orderDetai.reduce((preValue, curValue) => {
    const { price, discount } = curValue.products;
    return preValue + curValue.quantity * (price - (price * discount) / 100);
  }, 0);

  const renderItemDetail = () => {
    return orderDetai.map((item) => (
      <div
        className='flex gap-5 my-5 items-center'
        key={item.id}
      >
        <div className='bg-blue-400 basis-1/5 relative'>
          <img
            src={getImageUrl(item.products.images[0]?.source)}
            alt='img product'
          />
          {item.products.discount > 0 && (
            <div className='absolute top-0 right-0 m-1 p-1 bg-yellow-300 text-sm rounded-md'>
              Khuyến mãi {item.products.discount} %
            </div>
          )}
        </div>
        <div className='basis-4/5'>
          <h3 className='font-bold text-xl'>{item.products.name}</h3>
          <div className='flex my-3'>
            <p className='basis-1/4'>Giá: {lamTronGia(item.products.price)} VND</p>
            <p className='basis-1/4'>Khuyến mãi: {item.products.discount} %</p>
            <p className='basis-1/4'>Số lượng: {item.quantity} cái</p>
            <p className='basis-1/4 text-end'>
              Thành tiền:{' '}
              {lamTronGia(
                caculateTotal(item.products.price, item.quantity, item.products.discount)
              )}{' '}
              VND
            </p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <h2 className='text-3xl text-center font-bold py-5'>Chi Tiết Đơn Hàng</h2>
      <div className='p-10 mx-auto shadow-xl rounded-xl'>
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
      </div>

      <div className=' px-10 mx-auto shadow-xl rounded-xl mb-10'>
        <div>{renderItemDetail()}</div>
        <div className='text-end font-bold'>Tổng tiền: {lamTronGia(caculateTotalPrice)} VND</div>
        <div className='text-end py-5'>
          <button
            className='text-center btn-secondary mr-2 py-1 px-3 rounded-md font-medium text-lg text-white border border-solid uppercase'
            onClick={() => navigate('/admin/orders')}
          >
            Back
          </button>
          <button
            className='text-center btn-success mr-2 py-1 px-3 rounded-md font-medium text-lg text-white border border-solid uppercase'
            onClick={() => handleAcceptOrCancel(id, 'accepted')}
          >
            Accept
          </button>
          <button
            className='text-center btn-error py-1 px-3 rounded-md font-medium text-lg text-white border border-solid uppercase'
            onClick={() => handleAcceptOrCancel(id, 'cancel')}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
