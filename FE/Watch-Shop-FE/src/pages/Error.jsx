import React from 'react';

const Error = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16'>
      <div className='flex w-1/2'>
        <img
          src='/qa_engineers.svg'
          alt='qa engineers'
          className='w-1/2'
        />
        <img
          src='/bug_fixing.svg'
          alt='bug fixing'
          className='w-1/2'
        />
      </div>
      <p className='text-4xl font-medium text-main-red mt-10 '>Đã có lỗi xảy ra (T.T)</p>
    </div>
  );
};

export default Error;
