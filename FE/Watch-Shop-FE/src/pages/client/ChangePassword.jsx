import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import requestHandler from '../../utils/requestHandle';

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword = ({ user }) => {
  const navigate = useNavigate();
  const initial = (user?.fullName || 'U').charAt(0).toUpperCase();

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Vui lòng nhập mật khẩu hiện tại'),
    newPassword: Yup.string().required('Vui lòng nhập mật khẩu mới'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận không khớp')
      .required('Vui lòng nhập lại mật khẩu mới'),
  });

  const handlePasswordChange = async (values, { setSubmitting }) => {
    try {
      const dataReq = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
      const response = await requestHandler.post('change-password', dataReq);
      const data = await response.data;
      if (data === 'Change password successfully!') {
        toast.success('Đổi mật khẩu thành công!');
        setTimeout(() => navigate('/client'), 1500);
      } else {
        toast.info(data || 'Đã cập nhật.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Mật khẩu hiện tại không đúng. Vui lòng thử lại.';
      toast.error(typeof msg === 'string' ? msg : 'Đổi mật khẩu thất bại. Vui lòng thử lại.');
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
                      <div
                        className='shadow-xl rounded-full h-36 w-36 flex items-center justify-center text-white text-4xl font-bold border-4 border-white absolute left-0 right-0 -top-24 max-w-[150px] mx-auto bg-main-red'
                        aria-hidden
                      >
                        {initial}
                      </div>
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
                            Mật khẩu hiện tại
                          </label>
                          <Field
                            type='password'
                            id='currentPassword'
                            name='currentPassword'
                            className='w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 focus:border-main-red'
                            placeholder='Nhập mật khẩu hiện tại'
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
                            Mật khẩu mới
                          </label>
                          <Field
                            type='password'
                            id='newPassword'
                            name='newPassword'
                            className='w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 focus:border-main-red'
                            placeholder='Nhập mật khẩu mới'
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
                            Xác nhận mật khẩu mới
                          </label>
                          <Field
                            type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            className='w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 focus:border-main-red'
                            placeholder='Nhập lại mật khẩu mới'
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
                          Lưu
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
