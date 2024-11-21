import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { setStatusLoading } from '../../utils/counterCartSlice';

const Contact = () => {
  const form = useRef();
  const dispatch = useDispatch();

  const notify = () => toast('🙌 Cảm ơn bạn đã liên hệ với chúng tôi !');

  const sendEmail = (e) => {
    e.preventDefault();
    dispatch(setStatusLoading(true));
    emailjs
      .sendForm('service_zf96rw6', 'template_v9z8cqz', form.current, 'v3jjJZa_b1U7WD62k')
      .then(
        (result) => notify(),
        (error) => console.log(error.text)
      )
      .finally(() => dispatch(setStatusLoading(false)));
    e.target.reset();
  };

  return (
    <div>
      <div className='w-container mx-auto mt-8 h-[500px] flex mb-3 container'>
        <ToastContainer />
        <div className='w-1/2 p-4 bg-slate-100 rounded-lg mr-3'>
          <div className='mb-4 flex items-center'>
            <p className='text-gray-700 flex'>
              <div className='p-4 bg-white border-2 border-main-red rounded-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='1em'
                  viewBox='0 0 512 512'
                >
                  <path d='M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z' />
                </svg>
              </div>
              <div className='mt-3 ml-3'>
                <span className='text-main-black font-bold'>Phone:</span> +84 123 456 789
              </div>
            </p>
          </div>
          <div className='mb-4 flex items-center'>
            <p className='text-gray-700 flex'>
              <div className='p-4 bg-white border-2 border-main-red rounded-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='1em'
                  viewBox='0 0 512 512'
                >
                  <path d='M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z' />
                </svg>
              </div>
              <div className='mt-3 ml-3'>
                <span className='text-main-black font-bold'>Address:</span> 116 Tân Chánh Hiệp, Quận 12, TP.
                Hồ Chí Minh
              </div>
            </p>
          </div>
          <div className='flex items-center'>
            <p className='text-gray-700 flex'>
              <div className='p-4 bg-white border-2 border-main-red rounded-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='1em'
                  viewBox='0 0 512 512'
                >
                  <path d='M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z' />
                </svg>
              </div>
              <div className='mt-3 ml-3'>
                <span className='text-main-black font-bold'>Email: </span>ros8255@gmail.com
              </div>
            </p>
          </div>
        </div>
        <div className='w-1/2 p-4 bg-slate-100 rounded-lg'>
          <form
            className='w-full max-w-lg'
            ref={form}
            onSubmit={sendEmail}
          >
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Tên:
              </label>
              <input
                type='text'
                id='name'
                name='user_name'
                className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-main-red'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Email:
              </label>
              <input
                type='email'
                id='email'
                name='user_email'
                className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-main-red'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='message'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Tin nhắn:
              </label>
              <textarea
                id='message'
                name='message'
                rows='4'
                className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-main-red'
              />
            </div>
            <input
              className='bg-main-red text-white py-2 px-4 rounded-lg hover:bg-main-red-dark'
              type='submit'
              value='Send'
            />
          </form>
        </div>
      </div>
      <div className='w-container mx-auto mb-8 h-[500px]'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2872163456905!2d106.61554297480623!3d10.865745489288502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b2a11844fb9%3A0xbed3d5f0a6d6e0fe!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaSBUaMOgbmggUGjhu5EgSOG7kyBDaMOtIE1pbmggKFVUSCkgLSBDxqEgc-G7nyAz!5e0!3m2!1svi!2s!4v1729788596760!5m2!1svi!2s'
          width={1300}
          height={500}
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          title='manhlon'
        />
      </div>
    </div>
  );
};

export default Contact;
