import React from 'react';
import { PaginationProps } from './types';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button onClick={handleNext}>Next</button>
    </>
  );
};

export default Pagination;
