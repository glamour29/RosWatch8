import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-neutral-200 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left'>
      <div className='flex items-center justify-center border-b-2 border-main-red p-6 dark:border-neutral-500 lg:justify-between'>
        <div className='mr-12 hidden lg:block'>
          <span className='font-bold'>RosWatch rất vui được đồng hành cùng bạn !!!</span>
        </div>
        <div className='flex justify-center'>
          <a
            href='#!'
            className='mr-6 text-neutral-600 dark:text-neutral-200'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
            </svg>
          </a>
        </div>
      </div>

      <div className='mx-6 py-10 text-center md:text-left'>
        <div className='grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          <div>
            <h6 className='mb-4 flex items-center justify-center font-semibold uppercase md:justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='mr-3 h-4 w-4'
              >
                <path d='M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z' />
              </svg>
              RosWatch
            </h6>
            <p>
              Khám phá công nghệ đồng hồ thông minh tại cửa hàng trực tuyến của chúng tôi, với bộ sưu tập đa dạng kết hợp phong cách và tiện ích. Trải nghiệm tương lai của thời trang đeo tay tại RosWatch.
            </p>
          </div>
          <div>
            <h6 className='mb-4 font-semibold uppercase'>Liên hệ</h6>
            <p>Email: roswatch8255@gmail.com</p>
            <p>Điện thoại: +84 968794894</p>
          </div>
          <div>
            <h6 className='mb-4 font-semibold uppercase'>Hỗ trợ khách hàng</h6>
            <p>Câu hỏi thường gặp</p>
            <p>Giao hàng &amp; Đổi trả</p>
            <p>Bảo hành</p>
          </div>
          <div>
            <h6 className='mb-4 font-semibold uppercase'>Đăng ký nhận tin</h6>
            <p>Đăng ký nhận tin khuyến mãi và cập nhật mới nhất từ chúng tôi.</p>
          </div>
        </div>
      </div>
      <div className='bg-main-red p-6 text-center dark:bg-neutral-100'>
        <span className='text-neutral-100'>© 2024 Bản quyền: </span>
        <a
          className='font-semibold text-neutral-100 dark:text-neutral-100'
          href='https://tw-elements.com/'
        >
          RosWatch
        </a>
      </div>
    </footer>
  );
};

export default Footer;
