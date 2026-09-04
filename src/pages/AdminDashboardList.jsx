import { Search, ExternalLink, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboardList.module.css';

// Mock Data for the table
const TABLE_DATA = [
  { id: 1, title: 'Relief distribution among flood victims...', date: 'Jun 29, 2026', time: '10:30 AM', link: '#' },
  { id: 2, title: 'Community Health Camp In Sylhet O...', date: 'Jun 29, 2026', time: '10:30 AM', link: '#' },
  { id: 3, title: 'AI Face Morphing in Entertainment', date: 'Jun 29, 2026', time: '10:30 AM', link: '#' },
  { id: 4, title: 'Virtual Reality Concerts Revolutionize Music Industry', date: 'Jul 15, 2026', time: '7:00 PM', link: '#' },
  { id: 5, title: 'AI-Powered Scriptwriting Gains Traction in Hollywood', date: 'Aug 4, 2026', time: '2:45 PM', link: '#' },
  { id: 6, title: 'Deepfake Technology Raises Ethical Questions in Media', date: 'Sep 12, 2026', time: '11:15 AM', link: '#' },
  { id: 7, title: 'Interactive Storytelling Experiences with AI', date: 'Oct 23, 2026', time: '9:00 AM', link: '#' },
  { id: 8, title: 'AI Animation Tools Speed Up Film Production', date: 'Nov 5, 2026', time: '1:30 PM', link: '#' },
];

function AdminDashboardList() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Breadcrumbs & Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.breadcrumbs}>
            <span>Dashboard</span> &gt; <span>Content Management</span>
          </div>
          <h1 className={styles.title}>Blog & News Management</h1>
        </div>
        <button 
          className={styles.createBtn}
          onClick={() => navigate('/admin/content/create')}
        >
          Create New Content
        </button>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={18} />
        <input 
          type="text" 
          placeholder="Search Content" 
          className={styles.searchInput}
        />
      </div>

      {/* Data Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Content Title</th>
              <th>Published Date</th>
              <th>Source Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row) => (
              <tr key={row.id}>
                <td className={styles.rowTitle}>{row.title}</td>
                <td>
                  <div className={styles.dateBlock}>
                    <span className={styles.date}>{row.date}</span>
                    <span className={styles.time}>{row.time}</span>
                  </div>
                </td>
                <td>
                  <a href={row.link} className={styles.sourceLink}>
                    <ExternalLink size={18} />
                  </a>
                </td>
                <td>
                  <button className={styles.actionBtn}>
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className={styles.paginationFooter}>
        <div className={styles.pageInfo}>Page 1 of 1</div>
        
        <div className={styles.pagination}>
          <button className={styles.pageBtn} disabled>&lt;</button>
          <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <button className={styles.pageBtn}>4</button>
          <button className={styles.pageBtn}>5</button>
          <button className={styles.pageBtn}>&gt;</button>
        </div>
        
        <div className={styles.pageDropdown}>
          <span>1 / Page</span>
          <span className={styles.dropdownIcon}>▼</span>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardList;
