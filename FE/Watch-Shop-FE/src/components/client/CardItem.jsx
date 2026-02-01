import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from './RatingStar';
import { lamTronGia, getImageUrl } from '../../utils/functionCommon';

const CardItem = ({ item }) => {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/client/product-detail/${id}`);
  };

  return (
    <div className='col-span-3 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'>
      <div className='relative'>
        {item?.discount > 0 && (
          <span className='absolute z-50 bg-main-red text-white  rounded-b-md rounded-r-md py-2 px-4 font-bold capitalize shadow-lg right-[0%] opacity-80 hover:opacity-100 '>
            discount {item?.discount} %
          </span>
        )}
        <div className='cursor-pointer rounded-t-lg overflow-hidden h-[310px] flex items-center'>
          <img
            className='hover:scale-125 duration-200 ease-linear'
            src={getImageUrl(item.imageSource[0])}
            alt='img product'
            onClick={() => handleNavigate(item.id)}
          />
        </div>
      </div>
      <div className='p-6 flex flex-col justify-center gap-1 '>
        <h5
          className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center truncate cursor-pointer'
          onClick={() => handleNavigate(item.id)}
        >
          {item?.name}
        </h5>
        <div className='flex gap-4 justify-center'>
          <Rating
            isDisable={true}
            ratingStar={item.star}
          />
        </div>
        <div className='flex gap-4 justify-center'>
          <p className='mb-4 text-sm font-semibold text-main-red '>
            {lamTronGia(item?.price - item?.price * (item?.discount / 100))} vnd
          </p>
          {item?.discount > 0 && (
            <p className='mb-4 text-sm font-semibold text-main-black line-through'>
              {lamTronGia(item?.price)} vnd
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardItem;
