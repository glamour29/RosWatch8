import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import requestHandler from '../../utils/requestHandle';
import ChangePassword from './ChangePassword';
import HistoryOrder from './HistoryOrder';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = { fullName: '', email: '', birthDate: '', phone: '', address: '' };

const Profile = () => {
  const navigate = useNavigate();
  const [isStatusEdit, setIsStatusEdit] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(initialValues);

  const notify = () => toast('🙌 Cập nhật thành công!');

  useEffect(() => {
    const isLogin = localStorage.getItem('token');
    !isLogin && navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Vui lòng nhập họ tên'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    birthDate: Yup.date(),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
      .required('Vui lòng nhập số điện thoại'),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const user_Id = JSON.parse(localStorage.getItem('user_id'));
    try {
      const response = await requestHandler.put(`users/${user_Id}`, values);
      console.log('Successfully:', response.data);
      setIsStatusEdit(!isStatusEdit);
      notify();
    } catch (error) {
      console.error('Error profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const handleClickEdit = () => setIsStatusEdit(!isStatusEdit);

  const switchToProfile = () => setActiveTab('profile');

  const switchToHistoryOrder = () => setActiveTab('historyOrder');

  const switchToChangePassword = () => setActiveTab('changePassword');

  const fetchUser = async () => {
    const user_Id = JSON.parse(localStorage.getItem('user_id'));
    try {
      const response = await requestHandler.get(`users/${user_Id}`);
      const data = await response.data.data;
      console.log(data);
      setUser(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    user && formik.setValues(user);
  }, [user]);

  return (
    <div className='w-container mx-auto mt-20'>
      <ToastContainer />
      <div className='flex ml-5'>
        <button
          className={`${
            activeTab === 'profile' ? 'bg-main-red text-white' : 'bg-gray-300 text-gray-700'
          } px-4 py-2 rounded-tl-lg rounded-tr-lg`}
          onClick={switchToProfile}
        >
          Tài khoản
        </button>
        <button
          className={`${
            activeTab === 'historyOrder' ? 'bg-main-red text-white' : 'bg-gray-300 text-gray-700'
          } px-4 py-2 rounded-tl-lg rounded-tr-lg`}
          onClick={switchToHistoryOrder}
        >
          Lịch sử đơn hàng
        </button>
        <button
          className={`${
            activeTab === 'changePassword' ? 'bg-main-red text-white' : 'bg-gray-300 text-gray-700'
          } px-4 py-2 rounded-tl-lg rounded-tr-lg`}
          onClick={switchToChangePassword}
        >
          Đổi mật khẩu
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className='pb-16 bg-blueGray-200'>
          {' '}
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
                            {(user?.fullName || 'U').charAt(0).toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className='w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center'>
                        <div className='py-6 px-3 mt-32 sm:mt-0'>
                          <button
                            className='bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150'
                            onClick={handleClickEdit}
                          >
                            {isStatusEdit ? 'Cancel' : 'Edit'}
                          </button>
                        </div>
                      </div>
                      <div className='w-full lg:w-4/12 px-4 lg:order-1'></div>
                    </div>
                    <div className='text-center mt-28'>
                      <form
                        className='w-full py-10 px-20'
                        onSubmit={formik.handleSubmit}
                      >
                        <div className='grid grid-cols-2 col-span-2 gap-10'>
                          <div className='col-span-1 mb-6'>
                            <label
                              className='text-[#808080] text-sm font-bold self-center'
                              htmlFor='fullName'
                            >
                              Họ và tên
                            </label>
                            <input
                              readOnly={!isStatusEdit}
                              {...formik.getFieldProps('fullName')}
                              className={`w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 ${
                                formik.touched.fullName && formik.errors.fullName
                                  ? 'focus:border-main-red'
                                  : ''
                              }`}
                              type='text'
                              id='fullName'
                              name='fullName'
                              placeholder='Nhập họ tên'
                            />
                            {formik.touched.fullName && formik.errors.fullName && (
                              <div className='text-main-red'>{formik.errors.fullName}</div>
                            )}
                          </div>

                          <div className='col-span-1 mb-6'>
                            <label
                              className='text-[#808080] text-sm font-bold self-center'
                              htmlFor='email'
                            >
                              Email
                            </label>
                            <input
                              readOnly={true}
                              {...formik.getFieldProps('email')}
                              className={`w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 ${
                                formik.touched.email && formik.errors.email
                                  ? 'focus:border-main-red'
                                  : ''
                              }`}
                              type='text'
                              id='email'
                              name='email'
                              placeholder='Email'
                            />
                            {formik.touched.email && formik.errors.email && (
                              <div className='text-main-red'>{formik.errors.email}</div>
                            )}
                          </div>
                        </div>

                        <div className='grid grid-cols-2 col-span-2 gap-10'>
                          <div className='col-span-1 mb-6'>
                            <label
                              className='text-[#808080] text-sm font-bold self-center'
                              htmlFor='birthDate'
                            >
                              Birthday
                            </label>
                            <input
                              readOnly={!isStatusEdit}
                              {...formik.getFieldProps('birthDate')}
                              className={`w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 ${
                                formik.touched.birthDate && formik.errors.birthDate
                                  ? 'focus:border-main-red'
                                  : ''
                              }`}
                              type='date'
                              id='birthDate'
                              name='birthDate'
                              placeholder='Chọn ngày sinh'
                            />
                            {formik.touched.birthDate && formik.errors.birthDate && (
                              <div className='text-main-red'>{formik.errors.birthDate}</div>
                            )}
                          </div>

                          <div className='col-span-1 mb-6'>
                            <label
                              className='text-[#808080] text-sm font-bold self-center'
                              htmlFor='phone'
                            >
                              Số điện thoại
                            </label>
                            <input
                              readOnly={!isStatusEdit}
                              {...formik.getFieldProps('phone')}
                              className={`w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 ${
                                formik.touched.phone && formik.errors.phone
                                  ? 'focus:border-main-red'
                                  : ''
                              }`}
                              type='text'
                              id='phone'
                              name='phone'
                              placeholder='Nhập số điện thoại'
                            />
                            {formik.touched.phone && formik.errors.phone && (
                              <div className='text-main-red'>{formik.errors.phone}</div>
                            )}
                          </div>
                        </div>

                        <div className='mb-6'>
                          <label
                            className='text-[#808080] text-sm font-bold self-center'
                            htmlFor='address'
                          >
                            Address
                          </label>
                          <input
                            readOnly={!isStatusEdit}
                            {...formik.getFieldProps('address')}
                            className={`w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-2 ${
                              formik.touched.address && formik.errors.address
                                ? 'focus:border-main-red'
                                : ''
                            }`}
                            type='text'
                            id='address'
                            name='address'
                            placeholder='Nhập địa chỉ'
                          />
                          {formik.touched.address && formik.errors.address && (
                            <div className='text-main-red'>{formik.errors.address}</div>
                          )}
                        </div>
                        {isStatusEdit && (
                          <button
                            type='submit'
                            className='bg-main-black text-white py-2 px-4 rounded-xl hover:opacity-90'
                          >
                            Lưu
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {activeTab === 'historyOrder' && (
        <>
          <HistoryOrder />
        </>
      )}
      {activeTab === 'changePassword' && (
        <>
          <ChangePassword user={user} />
        </>
      )}
    </div>
  );
};

export default Profile;
