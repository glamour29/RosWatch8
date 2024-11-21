import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import { GrNext, GrPrevious } from 'react-icons/gr';
import requestHandler from '../../utils/requestHandle';
import Toast from '../../components/Toast';

const INIT_IMAGE = 'https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg';
const itemsPerPage = 10;
const initProduct = {
  color: '',
  description: '',
  discount: 0,
  faceMaterial: '',
  faceSize: 0,
  images: null,
  frameMaterial: '',
  idBrand: 1,
  model: '',
  name: '',
  origin: '',
  price: 0,
  productWeight: 0,
  quantity: 0,
  screenSize: 0,
  warrantyPeriod: 0,
  wireMaterial: '',
};

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(initProduct);
  const [state, setState] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [brands, setBrands] = useState([]);
  const [base64String, setBase64String] = useState(INIT_IMAGE);
  const [images, setImages] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
    setEditProduct(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditProduct(null);
    setBase64String(INIT_IMAGE);
  };

  const productSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
  });

  useEffect(() => {
    fetchProducts();
    fetchBrands();
  }, [state]);

  useEffect(() => {
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [products]);

  const offset = currentPage * itemsPerPage;
  const currentPageData = products.slice(offset, offset + itemsPerPage);

  const fetchBrands = async () => {
    try {
      const response = await requestHandler.get('brands/');
      const data = await response.data.data;
      setBrands(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await requestHandler.get('product/');
      const data = await response.data.data;
      // console.log(data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setImages(product.imageSource[0]);
    setBase64String(`http://localhost:8080/image/${product.imageSource[0]}`);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Bạn có chắc muốn xoá sản phẩm này?',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Xoá`,
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isDenied) {
        requestHandler
          .delete(`product/${id}`)
          .then((response) => {
            Swal.fire('Xoá thành công', '', 'success');
            setState(!state);
          })
          .catch((error) => {
            console.error(error);
            Swal.fire('Xoá thất bại', '', 'error');
          });
      }
    });
  };

  const handleAddOrUpdateBrand = async (values) => {
    try {
      let formData;
      if (editProduct) {
        formData = convertToFormData({
          ...values,
          images: typeof images === 'string' ? null : images,
        });
      } else {
        formData = convertToFormData(values);
      }

      const config = { headers: { 'content-type': 'multipart/form-data' } };
      await requestHandler.post('product/', formData, config);

      setState(!state);
      setType('success');
      closeModal();
      Swal.fire('Cập nhật thành công', '', 'success');
    } catch (error) {
      switch (error.response.status) {
        case 409:
          Swal.fire('Tên sản phẩm bị trùng', '', 'error');
          break;
        default:
          console.error('Error:', error);
          Swal.fire('Thêm mới thì phải thêm hình ảnh', '', 'error');
          break;
      }
    }
  };

  const convertToFormData = (object) => {
    const formData = new FormData();
    Object.keys(object).forEach((key) => {
      if (object[key] !== null && object[key] !== undefined) {
        formData.append(key, object[key]);
      }
    });
    return formData;
  };

  // render options
  const renderOptions = () => {
    return brands.map((brand) => (
      <option
        key={brand.id}
        value={brand.id}
      >
        {brand.name}
      </option>
    ));
  };

  const handleOnChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages(file);
      setBase64String(URL.createObjectURL(file));
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const renderProducts = () => {
    return currentPageData.map((product) => (
      <tr key={product.id}>
        <td className='text-center'>
          <img
            src={`http://localhost:8080/image/${product.imageSource[0]}`}
            alt='chưa có ảnh'
          />
        </td>
        <td>
          <p className='w-[250px] overflow-hidden overflow-ellipsis'>{product.name}</p>
        </td>
        {/* <td className=''></td> */}
        <td className='text-center'>{product.price.toLocaleString()} vnd</td>
        <td className='text-center'>{product.discount}%</td>
        <td className='text-center'>{product.quantity}</td>
        <td className='text-center'>{product.soldQuantity}</td>
        <td>{product.createDate}</td>
        <td>{product.updateDate}</td>
        <td className='text-center'>
          <button
            className='bg-orange-300 text-white px-2 rounded-lg hover:bg-orange-200'
            onClick={() => handleEdit(product)}
          >
            Edit
          </button>
          <button
            className='bg-red-400 text-white px-2 rounded-lg hover:bg-red-300 ml-2'
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <main className='flex-1 overflow-y-auto pt-8 px-6 bg-base-200'>
        <div className='card w-full p-6 bg-base-100 shadow-xl mt-2'>
          <div className='text-xl font-semibold inline-block'>
            Products
            <div className='inline-block float-right'>
              <div className='inline-block float-right'>
                <button
                  className='btn px-6 btn-sm normal-case btn-primary'
                  onClick={openModal}
                >
                  Add New
                </button>
              </div>
            </div>
          </div>
          <div className='divider mt-2'></div>
          <div className='h-full w-full pb-6 bg-base-100'>
            <div className='overflow-x-auto w-full'>
              <table className='table w-full'>
                <thead>
                  <tr>
                    <th className='w-36 text-center'>image</th>
                    <th>Name</th>
                    <th className='w-16 text-center'>price</th>
                    <th className='w-16 text-center'>discount</th>
                    <th className='w-16 text-center'>quantity</th>
                    <th className='text-center'>sold quantity</th>
                    <th className='text-center'>createDate</th>
                    <th className='w-16 text-center'>updateDate</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{renderProducts()}</tbody>
              </table>
              <ReactPaginate
                breakLabel='...'
                className='flex justify-center items-center gap-3 my-6 float-right mr-5'
                pageRangeDisplayed={3}
                pageCount={pageCount}
                marginPagesDisplayed={10}
                pageClassName='border border-solid w-10 h-10 rounded-md hover:bg-main-red hover:text-white cursor-pointer flex'
                pageLinkClassName='py-2 px-4'
                activeClassName='bg-main-red text-white'
                onPageChange={handlePageChange}
                nextLabel={
                  <span className='w-10 h-10 flex items-center justify-center bg-white rounded-md border border-solid'>
                    <GrNext />
                  </span>
                }
                previousLabel={
                  <span className='w-10 h-10 flex items-center justify-center bg-white rounded-md border border-solid'>
                    <GrPrevious />
                  </span>
                }
              />
            </div>
          </div>
        </div>
        <div className='h-16'></div>
      </main>

      {message && (
        <Toast
          message={message}
          type={type}
          onClose={() => setMessage('')}
        />
      )}

      {isModalOpen && (
        <div className='modal modal-open'>
          <div className='modal-box'>
            <button
              className='btn btn-sm btn-circle absolute right-2 top-2'
              onClick={closeModal}
            >
              ✕
            </button>
            <Formik
              initialValues={
                editProduct ? { ...editProduct, idBrand: editProduct.brandID } : initProduct
              }
              validationSchema={productSchema}
              onSubmit={handleAddOrUpdateBrand}
            >
              <Form>
                <h3 className='font-semibold text-2xl pb-6 text-center'>
                  {editProduct ? 'Edit Product' : 'Add New Product'}
                </h3>

                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text text-base-content undefined'>Name</span>
                  </label>
                  <Field
                    type='text'
                    name='name'
                    className='input input-bordered w-full '
                  />
                  <ErrorMessage
                    name='name'
                    component='div'
                    className='text-error'
                  />
                </div>

                <div className='form-control w-full flex flex-row gap-5'>
                  <div className='basis-1/3'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>price</span>
                    </label>
                    <Field
                      type='number'
                      name='price'
                      className='input input-bordered w-full '
                    />
                    <ErrorMessage
                      name='price'
                      component='div'
                      className='text-error'
                    />
                  </div>
                  <div className='basis-1/3'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>discount</span>
                    </label>
                    <Field
                      type='number'
                      name='discount'
                      className='input input-bordered w-full '
                    />
                    <ErrorMessage
                      name='discount'
                      component='div'
                      className='text-error'
                    />
                  </div>
                  <div className='basis-1/3'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>quantity</span>
                    </label>
                    <Field
                      type='number'
                      name='quantity'
                      className='input input-bordered w-full '
                    />
                    <ErrorMessage
                      name='quantity'
                      component='div'
                      className='text-error'
                    />
                  </div>
                </div>

                <div className='form-control w-full flex flex-row gap-5'>
                  <div className='basis-1/3'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>model</span>
                    </label>
                    <Field
                      type='text'
                      name='model'
                      className='input input-bordered w-full '
                    />
                    <ErrorMessage
                      name='model'
                      component='div'
                      className='text-error'
                    />
                  </div>
                  <div className='basis-1/3'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>color</span>
                    </label>
                    <Field
                      type='text'
                      name='color'
                      className='input input-bordered w-full '
                    />
                    <ErrorMessage
                      name='color'
                      component='div'
                      className='text-error'
                    />
                  </div>
                  <div className='basis-1/3'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>origin</span>
                    </label>
                    <Field
                      type='text'
                      name='origin'
                      className='input input-bordered w-full '
                    />
                    <ErrorMessage
                      name='origin'
                      component='div'
                      className='text-error'
                    />
                  </div>
                </div>

                <div className='form-control w-full flex flex-row gap-5'>
                  <div className='basis-1/3'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>warrantyPeriod</span>
                    </label>
                    <Field
                      type='number'
                      name='warrantyPeriod'
                      className='input input-bordered w-full '
                    />
                    <ErrorMessage
                      name='warrantyPeriod'
                      component='div'
                      className='text-error'
                    />
                  </div>
                  <div className='basis-1/3'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>screenSize</span>
                    </label>
                    <Field
                      type='number'
                      name='screenSize'
                      className='input input-bordered w-full '
                    />
                    <ErrorMessage
                      name='screenSize'
                      component='div'
                      className='text-error'
                    />
                  </div>
                  <div className='basis-1/3'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>faceSize</span>
                    </label>
                    <Field
                      type='number'
                      name='faceSize'
                      className='input input-bordered w-full '
                    />
                    <ErrorMessage
                      name='faceSize'
                      component='div'
                      className='text-error'
                    />
                  </div>
                </div>

                <div className='form-control w-full flex flex-row gap-5'>
                  <div className='basis-1/2'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>faceMaterial</span>
                    </label>
                    <Field
                      type='text'
                      name='faceMaterial'
                      className='input input-bordered w-full '
                    />
                    <ErrorMessage
                      name='faceMaterial'
                      component='div'
                      className='text-error'
                    />
                  </div>
                  <div className='basis-1/2'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>frameMaterial</span>
                    </label>
                    <Field
                      type='text'
                      name='frameMaterial'
                      className='input input-bordered w-full '
                    />
                    <ErrorMessage
                      name='frameMaterial'
                      component='div'
                      className='text-error'
                    />
                  </div>
                </div>

                <div className='form-control w-full flex flex-row gap-5'>
                  <div className='basis-1/2'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>wireMaterial</span>
                    </label>
                    <Field
                      type='text'
                      name='wireMaterial'
                      className='input input-bordered w-full '
                    />
                    <ErrorMessage
                      name='wireMaterial'
                      component='div'
                      className='text-error'
                    />
                  </div>
                  <div className='basis-1/2'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>productWeight</span>
                    </label>
                    <Field
                      type='number'
                      name='productWeight'
                      className='input input-bordered w-full '
                    />
                    <ErrorMessage
                      name='productWeight'
                      component='div'
                      className='text-error'
                    />
                  </div>
                </div>

                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text text-base-content undefined'>description</span>
                  </label>
                  <Field
                    type='text'
                    name='description'
                    className='input input-bordered w-full '
                    as='textarea'
                    rows='4'
                  />
                  <ErrorMessage
                    name='description'
                    component='div'
                    className='text-error'
                  />
                </div>

                <div className='form-control w-full flex flex-row gap-5'>
                  <div className='basis-1/2'>
                    <img
                      src={base64String}
                      alt='hinh anh'
                      className='w-1/2 mx-auto my-3'
                    />
                    <Field name='images'>
                      {({ field, form, meta }) => (
                        <input
                          id='file'
                          name='images'
                          type='file'
                          onChange={(event) => {
                            handleOnChangeImage(event);
                            form.setFieldValue('images', event.currentTarget.files[0]);
                          }}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name='images'
                      component='div'
                      className='text-error'
                    />
                  </div>
                  <div className='basis-1/2'>
                    <label className='label'>
                      <span className='label-text text-base-content undefined'>brand</span>
                    </label>
                    <Field
                      as='select'
                      name='idBrand'
                      className='input input-bordered w-full '
                    >
                      {renderOptions()}
                    </Field>
                  </div>
                </div>

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
      )}
    </>
  );
};

export default Products;
