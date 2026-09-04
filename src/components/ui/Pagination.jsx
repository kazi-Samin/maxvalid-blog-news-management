import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import styles from './Pagination.module.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Simplified for assignment mock
  return (
    <div className={styles.pagination}>
      <button className={styles.pageBtn} disabled={currentPage === 1}>
        <ChevronLeft size={16} />
      </button>
      
      <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
      <button className={styles.pageBtn}>2</button>
      <button className={styles.pageBtn}>3</button>
      
      <div className={styles.ellipsis}>
        <MoreHorizontal size={16} />
      </div>
      
      <button className={styles.pageBtn}>{totalPages}</button>
      
      <button className={styles.pageBtn} disabled={currentPage === totalPages}>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;
