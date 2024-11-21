import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import requestHandler from '../../utils/requestHandle';
import requestHandle from '../../utils/requestHandle';
import { lamTronGia } from '../../utils/functionCommon';
import { setCountCart } from '../../utils/counterCartSlice';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCart = async () => {
    const isLogin = localStorage.getItem('token');
    if (isLogin) {
      try {
        const response = await requestHandler.get('cart/');
        const data = await response.data.data;
        setCart(data);
        // dispatch(setCountCart(data.length));
        let totalAmount = 0;
        for (const item of data) {
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
    // console.log(user_id);
    // console.log(prodId.products.id);
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
    // console.log(prod);
    try {
      const dataReq = { userId: id_user, productId: prod.products.id, amount: 1 };
      await requestHandle.post('cart/', dataReq);
      // console.log('success', response.data);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (prod) => {
    const id_user = JSON.parse(localStorage.getItem('user_id'));
    // console.log(prod);
    try {
      const dataReq = { userId: id_user, productId: prod.products.id, amount: -1 };
      await requestHandle.post('cart/', dataReq);
      // console.log('success', response.data);
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
            src={`http://localhost:8080/image/${item.products.images[0]?.source}`}
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
        <h2 className='text-3xl font-semibold mb-4 text-center'>Your cart</h2>
        <div className='bg-white p-6 shadow-md rounded-lg'>
          <div className='flex justify-center border-b border-gray-300 p-3 bg-slate-400'>
            <div className='w-2/5'>
              <p className='font-semibold'>Product</p>
            </div>
            <div className='w-1/5'>
              <p className='font-semibold'>Image</p>
            </div>
            <div className='w-1/5'>
              <p className='font-semibold'>Quantity</p>
            </div>
            <div className='w-1/5'>
              <p className='font-semibold'>Price</p>
            </div>
            <div className='w-1/5'>
              <p className='font-semibold'>Total</p>
            </div>
            <div className='w-1/5'>
              <p className='font-semibold'>Action</p>
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
          Today's offer
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
