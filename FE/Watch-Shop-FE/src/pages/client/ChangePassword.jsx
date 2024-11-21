import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import requestHandler from '../../utils/requestHandle';

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string().required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm new password is required'),
  });

  const handlePasswordChange = async (values, { setSubmitting }) => {
    try {
      const dataReq = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
      const response = await requestHandler.post('change-password', dataReq);
      const data = await response.data;
      data === 'Change password successfully!' && navigate('/client');
    } catch (err) {
      console.error('Lỗi:', err);
    }
    setSubmitting(false);
  };

  return (
    <div className='pb-16 bg-blueGray-200'>
      <div className='w-container mx-auto'>
        <section className='py-16 bg-blueGray-200'>
          <div className='mx-auto px-4'>
            <div className='flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg'>
              <div className='px-6'>
                <div className='flex flex-wrap justify-center'>
                  <div className='w-full lg:w-3/12 px-4 lg:order-2 flex justify-center'>
                    <div className='relative w-full h-full'>
                      <img
                        alt='...'
                        src='/profile.svg'
                        className='shadow-xl rounded-full h-auto align-middle border-none absolute left-0 right-0 -top-24 max-w-150-px'
                      />
                    </div>
                  </div>
                </div>
                <div className='text-center mt-40'>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handlePasswordChange}
                  >
                    {({ isSubmitting }) => (
                      <Form className='w-full py-10 px-20'>
                        <div className='mb-6'>
                          <label
                            className='text-[#808080] text-sm font-bold self-center'
                            htmlFor='currentPassword'
                          >
                            Current Password
                          </label>
                          <Field
                            type='password'
                            id='currentPassword'
                            name='currentPassword'
                            className='w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 focus:border-main-red'
                            placeholder='Enter current password'
                          />
                          <ErrorMessage
                            name='currentPassword'
                            component='div'
                            className='text-red-500'
                          />
                        </div>
                        <div className='mb-6'>
                          <label
                            className='text-[#808080] text-sm font-bold self-center'
                            htmlFor='newPassword'
                          >
                            New Password
                          </label>
                          <Field
                            type='password'
                            id='newPassword'
                            name='newPassword'
                            className='w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 focus:border-main-red'
                            placeholder='Enter new password'
                          />
                          <ErrorMessage
                            name='newPassword'
                            component='div'
                            className='text-red-500'
                          />
                        </div>
                        <div className='mb-6'>
                          <label
                            className='text-[#808080] text-sm font-bold self-center'
                            htmlFor='confirmPassword'
                          >
                            Confirm Password
                          </label>
                          <Field
                            type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            className='w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 focus:border-main-red'
                            placeholder='Confirm new password'
                          />
                          <ErrorMessage
                            name='confirmPassword'
                            component='div'
                            className='text-red-500'
                          />
                        </div>
                        <button
                          type='submit'
                          disabled={isSubmitting}
                          className='bg-main-black text-white py-2 px-4 rounded-xl hover:opacity-90'
                        >
                          Save
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChangePassword;
