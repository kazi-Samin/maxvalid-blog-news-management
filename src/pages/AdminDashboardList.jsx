import { useState } from 'react';
import { Search, ExternalLink, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboardList.module.css';

const TABLE_DATA = [
  { id: 1, title: 'Relief distribution among flood victims...', date: 'Jun 29, 2026', time: '10:30 AM', link: '#' },
  { id: 2, title: 'Community Health Camp in Sylhet O...', date: 'Jun 29, 2026', time: '10:30 AM', link: '#' },
  { id: 3, title: 'AI Face Morphing in Entertainment', date: 'Jun 29, 2026', time: '10:30 AM', link: '#' },
  { id: 4, title: 'Virtual Reality Concerts Revolutionize Music Industry', date: 'Jul 15, 2026', time: '7:00 PM', link: '#' },
  { id: 5, title: 'AI-Powered Scriptwriting Gains Traction in Hollywood', date: 'Aug 4, 2026', time: '2:45 PM', link: '#' },
  { id: 6, title: 'Deepfake Technology Raises Ethical Questions in Media', date: 'Sep 12, 2026', time: '11:15 AM', link: '#' },
  { id: 7, title: 'Interactive Storytelling Experiences with AI', date: 'Oct 23, 2026', time: '9:00 AM', link: '#' },
  { id: 8, title: 'AI Animation Tools Speed Up Film Production', date: 'Nov 5, 2026', time: '1:30 PM', link: '#' },
  { id: 9, title: 'Augmented Reality Games Incorporate Real-Time AI', date: 'Dec 18, 2026', time: '4:45 PM', link: '#' },
  { id: 10, title: 'AI Face Morphing in Entertainment', date: 'Jun 29, 2026', time: '10:30 AM', link: '#' },
];

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = 5;

function AdminDashboardList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);

  const filtered = TABLE_DATA.filter(row =>
    row.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <nav className={styles.breadcrumbs} aria-label="breadcrumb">
            <span>Dashboard</span>
            <span className={styles.breadcrumbSep}>&rsaquo;</span>
            <span>Content Management</span>
          </nav>
          <h1 className={styles.title}>Blog &amp; News Management</h1>
        </div>
        <button
          className={styles.createBtn}
          onClick={() => navigate('/admin/content/create')}
        >
          Create New Content
        </button>
      </div>

      {/* Search */}
      <div className={styles.searchWrapper}>
        <Search size={16} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search Content"
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
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
            {filtered.map((row) => (
              <tr key={row.id}>
                <td className={styles.titleCell}>{row.title}</td>
                <td>
                  <span className={styles.dateText}>{row.date}</span>
                  <br />
                  <span className={styles.timeText}>{row.time}</span>
                </td>
                <td>
                  <a href={row.link} className={styles.linkIcon} title="Open source link">
                    <ExternalLink size={17} />
                  </a>
                </td>
                <td className={styles.actionCell}>
                  <div className={styles.menuWrapper}>
                    <button
                      className={styles.menuBtn}
                      onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                    >
                      <MoreVertical size={17} />
                    </button>
                    {openMenuId === row.id && (
                      <div className={styles.dropdown}>
                        <button className={styles.dropdownItem}>
                          <Eye size={14} /> View
                        </button>
                        <button className={styles.dropdownItem}>
                          <Edit size={14} /> Edit
                        </button>
                        <button className={`${styles.dropdownItem} ${styles.danger}`}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className={styles.paginationBar}>
        <span className={styles.pageInfo}>Page 1 of 1</span>

        <div className={styles.pages}>
          <button
            className={styles.pageBtn}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            &lt;
          </button>
          {[1, 2, 3, 4, 5].map(p => (
            <button
              key={p}
              className={`${styles.pageBtn} ${currentPage === p ? styles.activePage : ''}`}
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className={styles.pageBtn}
            disabled={currentPage === TOTAL_PAGES}
            onClick={() => setCurrentPage(p => Math.min(TOTAL_PAGES, p + 1))}
          >
            &gt;
          </button>
        </div>

        <div className={styles.perPage}>
          <span>1&nbsp;/&nbsp;Page</span>
          <span className={styles.chevron}>▼</span>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardList;
