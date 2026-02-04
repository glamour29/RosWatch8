import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import requestHandler from '../../utils/requestHandle';
import { lamTronGia, getImageUrl } from '../../utils/functionCommon';
import { setCountCart } from '../../utils/counterCartSlice';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const isLogin = localStorage.getItem('token');
    if (isLogin) {
      try {
        const response = await requestHandler.get('cart/');
        const data = response?.data?.data;
        const list = Array.isArray(data) ? data : [];
        setCart(list);
        dispatch(setCountCart(list.length));
        let totalAmount = 0;
        for (const item of list) {
          totalAmount += item.quantity * item.products.price;
        }
        setTotal(totalAmount);
      } catch (error) {
        console.log('error cart');
      }
    } else {
      navigate('/login');
    }
  };

  const deleteCart = async (prodId) => {
    const user_id = JSON.parse(localStorage.getItem('user_id'));
    try {
      const dataReq = { data: { userId: user_id, productId: prodId.products.id } };
      await requestHandler.delete('cart/', dataReq);
      fetchCart();
    } catch (error) {
      console.log(error, 'error delete cart');
    }
  };

  const increaseQuantity = async (prod) => {
    const id_user = JSON.parse(localStorage.getItem('user_id'));
    try {
      const dataReq = { userId: id_user, productId: prod.products.id, amount: 1 };
      await requestHandler.post('cart/', dataReq);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (prod) => {
    if (prod.quantity <= 1) {
      const confirmRemove = window.confirm(
        'Bạn có muốn xóa mặt hàng này khỏi giỏ hàng?'
      );
      if (confirmRemove) {
        await deleteCart(prod);
      }
      return;
    }
    const id_user = JSON.parse(localStorage.getItem('user_id'));
    try {
      const dataReq = { userId: id_user, productId: prod.products.id, amount: -1 };
      await requestHandler.post('cart/', dataReq);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const renderCart = () => {
    if (cart.length === 0) {
      return <div className='p-5 text-center font-bold'>Không có sản phẩm nào trong giỏ hàng</div>;
    }
    return cart?.map((item) => (
      <div
        className='flex justify-between items-center p-3'
        key={item.id}
      >
        <div className='w-2/5'>
          <p>{item.products.name}</p>
        </div>
        <div className='w-1/5'>
          <img
            src={getImageUrl(item.products.images[0]?.source)}
            alt=''
            className='w-16 h-16'
          />
        </div>
        <div className='w-1/5 flex'>
          <button
            className='bg-main-red text-amber-50 w-11 h-7 rounded-lg'
            onClick={() => decreaseQuantity(item)}
          >
            -
          </button>
          <p className='ml-2 mr-2'>{item.quantity}</p>
          <button
            className='bg-main-red text-amber-50 w-11 rounded-lg'
            data-value={item.id}
            onClick={() => increaseQuantity(item)}
          >
            +
          </button>
        </div>
        <div className='w-1/5'>
          <p>
            {lamTronGia(
              item?.products.price - item?.products.price * (item?.products.discount / 100)
            )}{' '}
            VNĐ
          </p>
        </div>
        <div className='w-1/5'>
          <p>
            {lamTronGia(
              item.quantity *
                (item?.products.price - item?.products.price * (item?.products.discount / 100))
            )}{' '}
            VNĐ
          </p>
        </div>
        <div className='w-1/5'>
          <button
            className='bg-red-500 text-amber-50 w-8 rounded-lg h-8 items-center'
            onClick={() => deleteCart(item)}
          >
            <AiFillDelete className='ml-2' />
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className='w-container mx-auto mt-8'>
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-3xl font-semibold mb-4 text-center'>Giỏ hàng của bạn</h2>
        <div className='bg-white p-6 shadow-md rounded-lg'>
          <div className='flex justify-center border-b border-gray-300 p-3 bg-slate-400'>
            <div className='w-2/5'>
              <p className='font-semibold'>Sản phẩm</p>
            </div>
            <div className='w-1/5'>
              <p className='font-semibold'>Hình ảnh</p>
            </div>
            <div className='w-1/5'>
              <p className='font-semibold'>Số lượng</p>
            </div>
            <div className='w-1/5'>
              <p className='font-semibold'>Đơn giá</p>
            </div>
            <div className='w-1/5'>
              <p className='font-semibold'>Thành tiền</p>
            </div>
            <div className='w-1/5'>
              <p className='font-semibold'>Thao tác</p>
            </div>
          </div>

          {renderCart()}

          <div className='font-semibold text-end mb-2'>Tổng cộng: {lamTronGia(total)} VNĐ</div>

          <div className='flex justify-end'>
            <div className='w-1/5'>
              <button
                className='bg-main-black text-white py-3 px-4 hover:bg-main-red w-full rounded-xl'
                onClick={() => navigate('/client/order-detail')}
                disabled={cart.length === 0}
              >
                Thanh toán
              </button>
              <button
                className='text-main-red mt-3 font-semibold bg-white hover:underline py-2 px-4 border border-black rounded-xl w-full'
                onClick={() => navigate('/client')}
              >
                Tiếp tục mua hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white p-8 rounded-lg shadow-lg mt-4 mb-4'>
        <h2 className='text-3xl font-semibold mb-4 border-b-2 border-main-red py-3'>
          Ưu đãi hôm nay
        </h2>
        <div className='flex'>
          <img
            src='https://bizweb.dktcdn.net/100/021/944/themes/723706/assets/code-20k-techwearvn.jpg?1697034449262'
            alt=''
            srcSet=''
            className='w-[400px]'
          />
          <img
            src='https://bizweb.dktcdn.net/100/021/944/themes/723706/assets/code-100k-techwearvn.jpg?1697034449262'
            alt=''
            srcSet=''
            className='w-[400px] ml-4'
          />
          <img
            src='https://bizweb.dktcdn.net/100/021/944/themes/723706/assets/code-500k-techwearvn.png?1697034449262'
            alt=''
            srcSet=''
            className='w-[400px] ml-4'
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
