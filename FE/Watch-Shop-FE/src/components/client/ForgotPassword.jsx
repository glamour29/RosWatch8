import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import requestHandle from '../../utils/requestHandle';
import undraw from '../../assets/img/bg-01.jpg';
import Toast from '../Toast';

const initialValuesStep1 = { email: '' };
const initialValuesStep2 = { code: '', newPassword: '', confirmPassword: '' };

const ForgotPassword = () => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const schemaStep1 = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  });

  const schemaStep2 = Yup.object().shape({
    code: Yup.string().length(6, 'Mã gồm 6 chữ số').required('Vui lòng nhập mã'),
    newPassword: Yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').required('Vui lòng nhập mật khẩu mới'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Mật khẩu không trùng khớp')
      .required('Vui lòng xác nhận mật khẩu'),
  });

  const handleSendCode = async (values) => {
    try {
      const response = await requestHandle.post('forgot-password', { email: values.email });
      const data = response.data;
      if (data === 'Invalid email or email has not been registered!') {
        setMessage('Email không hợp lệ hoặc chưa được đăng ký!');
        setType('error');
        return;
      }
      if (typeof data === 'string' && (data.includes('không gửi') || data.includes('Không gửi'))) {
        setMessage(data);
        setType('error');
        return;
      }
      setEmail(values.email);
      setMessage('Mã đã gửi đến email của bạn. Vui lòng kiểm tra hộp thư (và thư mục spam).');
      setType('success');
      setStep(2);
    } catch (err) {
      console.error('Lỗi:', err);
      setMessage(err.response?.data || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
      setType('error');
    }
  };

  const handleResetPassword = async (values) => {
    try {
      const response = await requestHandle.post('reset-password', {
        email,
        code: values.code,
        newPassword: values.newPassword,
      });
      const data = response.data;
      if (typeof data === 'string' && data.toLowerCase().includes('invalid')) {
        setMessage('Mã không đúng hoặc đã hết hạn. Vui lòng gửi lại mã.');
        setType('error');
        return;
      }
      setMessage('Đặt lại mật khẩu thành công. Bạn có thể đăng nhập bằng mật khẩu mới.');
      setType('success');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const msg = err.response?.data ?? 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      setMessage(typeof msg === 'string' ? msg : msg.message || JSON.stringify(msg));
      setType('error');
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className='bg-white w-full max-w-screen-md rounded-lg overflow-hidden'>
        <div
          className='bg-cover bg-center bg-gray-400 py-16'
          style={{ backgroundImage: `url(${undraw})` }}
        >
          <h1 className='text-4xl text-white font-bold uppercase text-center p-4'>
            Quên mật khẩu
          </h1>
        </div>

        {step === 1 && (
          <Formik
            initialValues={initialValuesStep1}
            validationSchema={schemaStep1}
            onSubmit={handleSendCode}
          >
            <Form className='w-full py-10 px-20'>
              {message && (
                <Toast message={message} type={type} onClose={() => setMessage('')} />
              )}
              <div className='mb-6 grid grid-cols-8 gap-2'>
                <label className='text-[#808080] text-sm font-bold self-center col-span-1' htmlFor='email'>
                  Email
                </label>
                <Field
                  type='email'
                  id='email'
                  name='email'
                  className='w-full col-span-7 border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 focus:border-main-red'
                  placeholder='Nhập email'
                />
                <div className='col-span-1'></div>
                <ErrorMessage name='email' component='div' className='text-red-500 col-span-7' />
              </div>
              <div className='mb-6 grid grid-cols-8 pt-7'>
                <div className='col-span-1'></div>
                <button
                  type='submit'
                  className='w-full col-span-7 bg-main-red text-white font-bold py-2 rounded-full hover:bg-main-black'
                >
                  Gửi mã xác thực
                </button>
              </div>
              <div className='col-span-6 text-right text-sm'>
                <span>Quay lại </span>
                <Link to='/login' className='text-[#999999] font-bold'>Đăng nhập</Link>
              </div>
            </Form>
          </Formik>
        )}

        {step === 2 && (
          <Formik
            initialValues={initialValuesStep2}
            validationSchema={schemaStep2}
            onSubmit={handleResetPassword}
          >
            <Form className='w-full py-10 px-20'>
              {message && (
                <Toast message={message} type={type} onClose={() => setMessage('')} />
              )}
              <p className='mb-4 text-sm text-gray-600'>Mã đã gửi đến <strong>{email}</strong></p>
              <div className='mb-6 grid grid-cols-8 gap-2'>
                <label className='text-[#808080] text-sm font-bold self-center col-span-1' htmlFor='code'>
                  Mã
                </label>
                <Field
                  type='text'
                  id='code'
                  name='code'
                  maxLength={6}
                  className='w-full col-span-7 border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 focus:border-main-red'
                  placeholder='Nhập mã 6 chữ số'
                />
                <div className='col-span-1'></div>
                <ErrorMessage name='code' component='div' className='text-red-500 col-span-7' />
              </div>
              <div className='mb-6 grid grid-cols-8 gap-2'>
                <label className='text-[#808080] text-sm font-bold self-center col-span-1' htmlFor='newPassword'>
                  Mật khẩu mới
                </label>
                <Field
                  type='password'
                  id='newPassword'
                  name='newPassword'
                  className='w-full col-span-7 border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 focus:border-main-red'
                  placeholder='Nhập mật khẩu mới'
                />
                <div className='col-span-1'></div>
                <ErrorMessage name='newPassword' component='div' className='text-red-500 col-span-7' />
              </div>
              <div className='mb-6 grid grid-cols-8 gap-2'>
                <label className='text-[#808080] text-sm font-bold self-center col-span-1' htmlFor='confirmPassword'>
                  Xác nhận
                </label>
                <Field
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  className='w-full col-span-7 border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 focus:border-main-red'
                  placeholder='Nhập lại mật khẩu mới'
                />
                <div className='col-span-1'></div>
                <ErrorMessage name='confirmPassword' component='div' className='text-red-500 col-span-7' />
              </div>
              <div className='mb-6 grid grid-cols-8 pt-7'>
                <div className='col-span-1'></div>
                <button
                  type='submit'
                  className='w-full col-span-7 bg-main-red text-white font-bold py-2 rounded-full hover:bg-main-black'
                >
                  Đặt lại mật khẩu
                </button>
              </div>
              <div className='col-span-6 text-right text-sm flex justify-between items-center'>
                <button
                  type='button'
                  onClick={() => { setStep(1); setMessage(''); }}
                  className='text-main-red font-bold'
                >
                  Gửi lại mã
                </button>
                <Link to='/login' className='text-[#999999] font-bold'>Đăng nhập</Link>
              </div>
            </Form>
          </Formik>
        )}

        <div className='relative bg-gray-600 bg-opacity-70 top-0 left-0 h-full'></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
