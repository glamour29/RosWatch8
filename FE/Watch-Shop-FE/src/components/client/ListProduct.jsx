import React, { useEffect, useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import CardItem from './CardItem';

const ListProduct = ({ filteredList }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    setPageCount(Math.ceil(filteredList.length / itemsPerPage));
    setCurrentPage(0);
  }, [filteredList]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredList.slice(offset, offset + itemsPerPage);

  const renderCartItem = () => {
    return currentPageData.map((item, i) => {
      return (
        <CardItem
          item={item}
          key={i}
        />
      );
    });
  };

  return (
    <div className='my-2'>
      <div className='grid grid-cols-12 gap-5'>{renderCartItem()}</div>
      {pageCount > 1 && (
        <div className='flex justify-center'>
          <ReactPaginate
            breakLabel='...'
            className='flex  gap-3 my-6'
            pageRangeDisplayed={3}
            pageCount={pageCount}
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
      )}
    </div>
  );
};

export default ListProduct;
