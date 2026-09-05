import { useState, useEffect } from 'react';
import { Search, ExternalLink, MoreVertical, Edit, Trash2, Eye, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchArticles } from '../services/articleService';
import styles from './AdminDashboardList.module.css';

function AdminDashboardList() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      const data = await fetchArticles();
      if (isMounted) {
        setArticles(data);
        setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = articles.filter(row =>
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
            {loading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                  Loading content...
                </td>
              </tr>
            ) : filtered.length > 0 ? (
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
