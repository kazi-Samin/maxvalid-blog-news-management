import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { CATEGORIES } from '../data/articles';
import { fetchArticles } from '../services/articleService';
import NewsCard from '../components/ui/NewsCard';
import Pagination from '../components/ui/Pagination';
import heroImage from '../assets/image 96.png';
import imgFeatured from '../assets/span.minimal__image__root.png';
import styles from './PublicNews.module.css';

const ITEMS_PER_PAGE = 9; // 3 rows × 3 columns = 9 cards per page (matching Figma spec)

function PublicNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Gallery & Media");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      setLoading(true);
      const res = await fetchArticles();
      if (isMounted) {
        setArticles(res.articles);
        setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter articles based on category and debounced search term
  const filteredNews = articles.filter((item) => {
    const matchesCategory =
      selectedCategory === "All Gallery & Media" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination slice for 9 cards per page
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE) || 1;
  const currentArticles = filteredNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>News &amp; Articles</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className={styles.container}>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Blog search"
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Featured Article */}
          <h2 className={styles.sectionTitle}>Featured News &amp; Articles</h2>
          <NewsCard
            featured={true}
            title="Relief distribution among flood victims in Greater Chittagong"
            description="A severe flood hit Chittagong in the first week of this month. Extensive areas in Chittagong, Cox's Bazar, and Bandarban were severely affected. Relief teams delivered emergency packages..."
            date="July 22, 2026"
            image={imgFeatured}
          />

          {/* 2-col: Sidebar + 3x3 Articles Grid (9 cards per page) */}
          <div className={styles.gridContainer}>
            <aside className={styles.sidebar}>
              <ul className={styles.categoryList}>
                {CATEGORIES.map((cat, index) => (
                  <li
                    key={index}
                    className={selectedCategory === cat ? styles.activeCategory : ''}
                    onClick={() => handleCategorySelect(cat)}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </aside>

            <div className={styles.articlesGrid}>
              {loading ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: '#667085' }}>
                  <p style={{ fontSize: '1rem', fontWeight: 600 }}>Loading articles...</p>
                </div>
              ) : currentArticles.length > 0 ? (
                currentArticles.map((news) => (
                  <NewsCard
                    key={news.id}
                    title={news.title}
                    description={news.description}
                    date={news.date}
                    image={news.image}
                  />
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                  <h3>No articles found</h3>
                  <p>Try adjusting your search terms or category selection.</p>
                </div>
              )}
            </div>
          </div>

          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              onPageChange={(p) => setCurrentPage(p)}
              totalPages={totalPages}
            />
          )}

        </div>
      </section>
    </div>
  );
}

export default PublicNews;
