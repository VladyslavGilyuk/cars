import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../customHooks/usePagination';
import '../styles/pagination.css';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;
  // Get the pagination range using the custom hook usePagination
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });
  // If there is only one page or the pagination range has fewer than 2 items, don't display the pagination component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  // Function to handle the "Next" button click
  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  // Function to handle the "Previous" button click
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  // Get the last page from the pagination range
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
       {/* Left navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
		
        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;