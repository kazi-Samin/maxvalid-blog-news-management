import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import styles from './Pagination.module.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) onPageChange(currentPage + 1);
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.pageBtn} disabled={currentPage === 1} onClick={handlePrev}>
        <ChevronLeft size={16} />
      </button>
      
      <button className={`${styles.pageBtn} ${styles.active}`}>{currentPage}</button>
      {totalPages > 1 && <button className={styles.pageBtn} onClick={() => onPageChange && onPageChange(2)}>2</button>}
      {totalPages > 2 && <button className={styles.pageBtn} onClick={() => onPageChange && onPageChange(3)}>3</button>}
      
      {totalPages > 4 && (
        <div className={styles.ellipsis}>
          <MoreHorizontal size={16} />
        </div>
      )}
      
      {totalPages > 3 && (
        <button className={styles.pageBtn} onClick={() => onPageChange && onPageChange(totalPages)}>
          {totalPages}
        </button>
      )}
      
      <button className={styles.pageBtn} disabled={currentPage === totalPages} onClick={handleNext}>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;
