import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import requestHandle from '../../utils/requestHandle';
import { setCountCart } from '../../utils/counterCartSlice';

function OrderSuccess() {
  const [invoiceData, setInvoiceData] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const url = location.search;
    const urlParams = new URLSearchParams(url);
    const amount = urlParams.get('vnp_Amount');
    const invoiceId = urlParams.get('vnp_BankTranNo');
    const emailCustomer = urlParams.get('vnp_OrderInfo').split(',')[0];
    const paymentDate = urlParams.get('vnp_PayDate');
    const year = paymentDate.substring(0, 4);
    const month = paymentDate.substring(6, 4);
    const day = paymentDate.substring(8, 6);
    const formattedDate = `${day}/${month}/${year}`;
    const status = urlParams.get('vnp_ResponseCode') === '00' ? 'successfully' : 'failed';
    setInvoiceData({ invoiceId, emailCustomer, amount, formattedDate, status });

    if (status === 'successfully') {
      Swal.fire('Thanh toán thành công', '', 'success');
      handlePaymentSuccess(amount);
    } else {
      Swal.fire('Thanh toán thất bại', '', 'error');
    }
  }, []);

  const handlePaymentSuccess = async (amount) => {
    const idUser = Number(localStorage.getItem('user_id'));
    const orderReqDTO = { userId: idUser, status: 'waiting', total: amount };

    try {
      await requestHandle.post('order/', orderReqDTO);
      await requestHandle.delete(`cart/all/${idUser}`);
      const response = await requestHandle.get('cart/');
      const carts = await response.data.data;
      dispatch(setCountCart(carts.length));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-1/3 rounded-md shadow-2xl mx-auto my-20'>
      <p className='text-center font-bold text-3xl uppercase '>Hóa đơn</p>
      <div className='flex flex-col gap-3 mx-4 my-3'>
        <div className='flex gap-3 items-center'>
          <label className='font-semibold text-2xl'>Mã giao dịch: </label>
          <p className='text-lg'>{invoiceData?.invoiceId}</p>
        </div>
        <div className='flex gap-3 items-center'>
          <label className='font-semibold text-2xl'>Email: </label>
          <p className='text-lg'>{invoiceData?.emailCustomer}</p>
        </div>
        <div className='flex gap-3 items-center'>
          <label className='font-semibold text-2xl'>Số tiền: </label>
          <p className='text-lg'>{invoiceData?.amount}</p>
        </div>
        <div className='flex gap-3 items-center'>
          <label className='font-semibold text-2xl'>Ngày thanh toán: </label>
          <p className='text-lg'>{invoiceData?.formattedDate}</p>
        </div>
        <div className='flex gap-3 items-center mb-5'>
          <label className='font-semibold text-2xl'>Trạng thái: </label>
          <p className='text-lg'>{invoiceData?.status === 'successfully' ? 'Thành công' : 'Thất bại'}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
