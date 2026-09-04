import { useState } from 'react';
import { Search, ExternalLink, MoreVertical, Edit, Trash2, Eye, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboardList.module.css';

const MOCK_ROWS = [
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

function AdminDashboardList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);

  const filtered = MOCK_ROWS.filter(row =>
    row.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <nav className={styles.breadcrumbs}>
            <span>Dashboard</span>
            <span className={styles.breadcrumbSep}>&rsaquo;</span>
            <span>Content Management</span>
          </nav>
          <h1 className={styles.title}>Blog &amp; News Management</h1>
        </div>
        <button
          className={styles.createBtn}
          onClick={() => navigate('/admin/blog-news/create')}
        >
          Create New Content
        </button>
      </div>

      {/* Search Input Box */}
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

      {/* Content Table Card */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Content Title</th>
              <th>Published Date</th>
              <th>Source Link</th>
              <th className={styles.centerAlign}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((row) => (
                <tr key={row.id}>
                  <td className={styles.titleCell}>{row.title}</td>
                  <td className={styles.dateCell}>
                    <div className={styles.dateText}>{row.date}</div>
                    <div className={styles.timeText}>{row.time}</div>
                  </td>
                  <td>
                    <a
                      href={row.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkIcon}
                    >
                      <ExternalLink size={16} color="#0084d4" />
                    </a>
                  </td>
                  <td className={styles.actionCell}>
                    <div className={styles.menuWrapper}>
                      <button
                        className={styles.menuBtn}
                        onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                        aria-label="Actions menu"
                      >
                        <MoreVertical size={16} color="#667085" />
                      </button>

                      {openMenuId === row.id && (
                        <div className={styles.dropdown}>
                          <button className={styles.dropdownItem} onClick={() => setOpenMenuId(null)}>
                            <Eye size={14} /> View
                          </button>
                          <button className={styles.dropdownItem} onClick={() => setOpenMenuId(null)}>
                            <Edit size={14} /> Edit
                          </button>
                          <button className={`${styles.dropdownItem} ${styles.danger}`} onClick={() => setOpenMenuId(null)}>
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                  No content found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Row matching Figma screenshot */}
        <div className={styles.paginationBar}>
          <div className={styles.pageInfo}>
            Page {currentPage} of 5
          </div>
          
          <div className={styles.pages}>
            <button
              className={styles.pageBtn}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              &lsaquo;
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={currentPage === page ? `${styles.pageBtn} ${styles.activePage}` : styles.pageBtn}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={styles.pageBtn}
              disabled={currentPage === 5}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              &rsaquo;
            </button>
          </div>

          <div className={styles.perPage}>
            <span>10/Page</span>
            <ChevronDown size={14} className={styles.chevron} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardList;
