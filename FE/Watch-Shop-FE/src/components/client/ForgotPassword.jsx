import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import requestHandle from '../../utils/requestHandle';
import undraw from '../../assets/img/bg-01.jpg';
import Toast from '../Toast';

const initialValues = { email: '' };

const ForgotPassword = () => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const handleForgotPassword = async (values) => {
    try {
      const response = await requestHandle.post('forgot-password', { email: values.email });
      const data = await response.data;
      if (data === 'Invalid email or email has not been registered!') {
        setMessage(data);
        setType('error');
      } else {
        localStorage.setItem('forgot-password', data);
        navigate('/login');
      }
    } catch (err) {
      console.error('Lỗi:', err);
      navigate('/error');
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
            Forgot Password
          </h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
        >
          <Form className='w-full py-10 px-20'>
            {message && (
              <Toast
                message={message}
                type={type}
                onClose={() => setMessage('')}
              />
            )}
            <div className='mb-6 grid grid-cols-8 gap-2'>
              <label
                className='text-[#808080] text-sm font-bold self-center col-span-1'
                htmlFor='email'
              >
                Email
              </label>
              <Field
                type='email'
                id='email'
                name='email'
                className='w-full col-span-7 border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 focus:border-main-red'
                placeholder='Enter email'
              />
              <div className='col-span-1'></div>
              <ErrorMessage
                name='email'
                component='div'
                className='text-red-500 col-span-7'
              />
            </div>

            <div className='mb-6 grid grid-cols-8 pt-7'>
              <div className='col-span-1'></div>
              <button
                type='submit'
                className='w-full col-span-7 bg-main-red text-white font-bold py-2 rounded-full hover:bg-main-black'
              >
                Send Email
              </button>
            </div>
            <div className='col-span-6 text-right text-sm'>
              <span className=''>Return page </span>
              <Link
                to='/login'
                className='text-[#999999] font-bold'
              >
                Login
              </Link>
            </div>
          </Form>
        </Formik>
        <div className='relative bg-gray-600 bg-opacity-70 top-0 left-0 h-full'></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
