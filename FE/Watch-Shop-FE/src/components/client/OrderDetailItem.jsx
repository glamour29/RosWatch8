import React from 'react';
import { lamTronGia } from '../../utils/functionCommon';

const OrderDetailItem = ({ item }) => {
  const caculateTotal = (price, quantity, discount) => {
    return quantity * (price - (price * discount) / 100);
  };

  return (
    <div className='flex gap-5 my-5 items-center'>
      <div className='bg-blue-400 basis-1/5 relative'>
        <img
          src={`http://localhost:8080/image/${item.products.images[0]?.source}`}
          alt='img product'
        />
        {item.discount > 0 && (
          <div className='absolute top-0 right-0 m-1 p-1 bg-yellow-300 text-sm rounded-md'>
            Khuyến mãi {item.discount} %
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
            {lamTronGia(caculateTotal(item.products.price, item.quantity, item.products.discount))}{' '}
            VND
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailItem;
