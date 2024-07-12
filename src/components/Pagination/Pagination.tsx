import React from 'react';
import { PaginationProps } from './types';
import styles from './Pagination.module.css';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      {pageNumbers.map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={pageNumber === currentPage}
          className={styles.pagination__page}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
