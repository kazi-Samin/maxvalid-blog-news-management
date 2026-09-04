import { useState } from 'react';
import { Search, ExternalLink, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ARTICLES } from '../data/articles';
import styles from './AdminDashboardList.module.css';

const ITEMS_PER_PAGE = 10;

function AdminDashboardList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);

  const filtered = ARTICLES.filter(row =>
    row.title.toLowerCase().includes(search.toLowerCase()) ||
    row.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const currentRows = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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
          onClick={() => navigate('/admin/blog-news/create')}
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
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Content Title</th>
              <th>Category</th>
              <th>Published Date</th>
              <th>Source Link</th>
              <th className={styles.centerAlign}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr key={row.id}>
                  <td className={styles.titleCell}>{row.title}</td>
                  <td><span className={styles.categoryBadge}>{row.category}</span></td>
                  <td className={styles.dateCell}>{row.date}</td>
                  <td>
                    <a
                      href={row.sourceLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sourceLink}
                    >
                      <span>Link</span>
                      <ExternalLink size={14} />
                    </a>
                  </td>
                  <td className={styles.actionCell}>
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                        aria-label="Actions menu"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {openMenuId === row.id && (
                        <div className={styles.dropdownMenu}>
                          <button onClick={() => setOpenMenuId(null)}>
                            <Eye size={14} /> View
                          </button>
                          <button onClick={() => setOpenMenuId(null)}>
                            <Edit size={14} /> Edit
                          </button>
                          <button onClick={() => setOpenMenuId(null)} className={styles.deleteOption}>
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
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                  No content matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className={styles.paginationRow}>
          <div className={styles.paginationInfo}>
            Showing {filtered.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} entries
          </div>
          <div className={styles.paginationBtns}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className={styles.pageArrowBtn}
            >
              &lsaquo;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={currentPage === page ? `${styles.pageBtn} ${styles.activePage}` : styles.pageBtn}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className={styles.pageArrowBtn}
            >
              &rsaquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardList;
