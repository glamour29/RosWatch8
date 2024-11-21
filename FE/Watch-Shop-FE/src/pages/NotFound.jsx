import React from 'react';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16'>
      <img
        src='/page_not_found.svg'
        alt='page not found'
        className='w-1/3'
      />
      <p className='text-4xl font-medium text-main-red mt-10 '>
        Không tìm thấy trang mà bạn yêu cầu (T.T)
      </p>
    </div>
  );
};

export default NotFound;
