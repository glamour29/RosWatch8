import { useEffect, useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import requestHandler from '../../utils/requestHandle';
import Swal from 'sweetalert2';
import { formatPhoneNumber } from '../../utils/functionCommon';

const ITEMS_PER_PAGE = 10;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(users.length / ITEMS_PER_PAGE));
    setCurrentPage(0);
  }, [users]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const fetchUsers = async () => {
    try {
      const response = await requestHandler.get('users');
      const data = await response.data.data;
      // console.log(data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = users.slice(offset, offset + ITEMS_PER_PAGE);

  const handleChangeStatus = async (id, isDeleted) => {
    try {
      if (!isDeleted) {
        Swal.fire({
          title: 'Bạn có chắc muốn disable tài khoản này?',
          showConfirmButton: false,
          showDenyButton: true,
          showCancelButton: true,
          denyButtonText: `Xoá`,
          cancelButtonText: 'Huỷ',
        }).then((result) => {
          if (result.isDenied) {
            requestHandler.delete(`users/${id}`).then(() => fetchUsers());
          }
        });
      } else {
        await requestHandler.delete(`users/${id}`);
        fetchUsers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeRole = async (id) => {
    try {
      await requestHandler.patch(`users/${id}`);
      fetchUsers();
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <main className='flex-1 overflow-y-auto pt-8 px-6  bg-base-200'>
        <div className='card w-full p-6 bg-base-100 shadow-xl mt-2'>
          <div className='text-xl font-semibold inline-block'>Users</div>
          <div className='divider mt-2'></div>
          <div className='h-full w-full pb-6 bg-base-100'>
            <div className='overflow-x-auto w-full'>
              <table className='table w-full'>
                <thead>
                  <tr>
                    <th>Full name</th>
                    <th>BirthDAte</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((user) => (
                    <tr key={user.id}>
                      <td>{user.fullName}</td>
                      <td>{user.birthDate}</td>
                      <td>{user.address}</td>
                      <td>{user.email}</td>
                      <td>{formatPhoneNumber(user.phone)}</td>
                      <td
                        className={`hover:underline cursor-pointer font-bold
                        ${'ROLE_ADMIN' === user.roles && 'text-green-400'}`}
                        onClick={() => handleChangeRole(user.id)}
                      >
                        {user.roles}
                      </td>
                      <td>
                        <button
                          onClick={() => handleChangeStatus(user.id, user.deleted)}
                          className={`text-white font-bold px-3 py-2 rounded-lg hover:opacity-90 
                            ${user.deleted ? 'bg-green-400' : 'bg-red-500'}`}
                        >
                          {user.deleted ? 'ACTIVE' : 'DISABLE'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ReactPaginate
                breakLabel='...'
                className='flex justify-center items-center gap-3 my-6 float-right mr-5'
                nextLabel={
                  <span className='w-10 h-10 flex items-center justify-center bg-white rounded-md border border-solid'>
                    <GrNext />
                  </span>
                }
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel={
                  <span className='w-10 h-10 flex items-center justify-center bg-white rounded-md border border-solid'>
                    <GrPrevious />
                  </span>
                }
                marginPagesDisplayed={10}
                pageClassName='border border-solid rounded-md py-2 px-4 hover:bg-main-red hover:text-white cursor-pointer'
                activeClassName='bg-main-red text-white'
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
        <div className='h-16'></div>
      </main>

      {/* {message && (
        <Toast
          message={message}
          type={type}
          onClose={() => setMessage('')}
        />
      )}

      {isModalOpen && (
        <div className='modal modal-open'>
          <div className='modal-box  '>
            <button
              className='btn btn-sm btn-circle absolute right-2 top-2'
              onClick={closeModal}
            >
              ✕
            </button>
            <Formik
              initialValues={{ name: editBrand ? editBrand.name : '' }}
              validationSchema={userschema}
              onSubmit={handleAddOrUpdateBrand}
            >
              <Form>
                <h3 className='font-semibold text-2xl pb-6 text-center'>
                  {editBrand ? 'Edit Brand' : 'Add New Brand'}
                </h3>
                <div className='form-control w-full mt-4'>
                  <label className='label'>
                    <span className='label-text text-base-content undefined'>Name</span>
                  </label>
                  <Field
                    type='text'
                    name='name'
                    className='input  input-bordered w-full '
                  />
                  <ErrorMessage
                    name='name'
                    component='div'
                    className='text-error'
                  />
                </div>
                <p className='text-center  text-error mt-16'></p>
                <div className='modal-action'>
                  <button
                    className='btn btn-ghost'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary px-6'
                  >
                    Save
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Users;
