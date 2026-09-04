import { Search } from 'lucide-react';
import NewsCard from '../components/ui/NewsCard';
import Pagination from '../components/ui/Pagination';
import styles from './PublicNews.module.css';

// Mock data based on the Figma design
const CATEGORIES = [
  "All Gallery & Media", "Blood Donation", "Tree Plantation", 
  "Education & Student Support", "Women Empowerment", "Disability Support",
  "Community Development", "Anti-Drug Awareness", "Travel & Tour Management",
  "Disaster", "Blanket Distribution During Winter", "Tree Distribution",
  "Winter Clothing Distribution", "Safe Drinking Water", "Qurbani for Everyone",
  "Food Distribution", "Skills Development Training"
];

const NEWS_DATA = [
  {
    id: 1,
    title: "Relief distribution among flood victims in Greater...",
    description: "A severe flood hit Chittagong in the first week of this month. Extensive areas in Chittagong, Cox's Bazar, and Bandarban were...",
    date: "July 22, 2026",
    image: "/src/assets/image 96.png" // Placeholder based on assets
  },
  {
    id: 2,
    title: "3rd Imams' Training Completed",
    description: "The 3rd Imams' Training by the As-Sunnah Foundation has been successfully completed with the participation of selected Imams and...",
    date: "July 11, 2026",
    image: "/src/assets/span.minimal__image__root (1).png"
  },
  {
    id: 3,
    title: "Qurbani for All 2026 Project Completed",
    description: "Breaking all past records to bring Eid smiles to the faces of the country's underprivileged and disaster-affected people, the social...",
    date: "June 25, 2026",
    image: "/src/assets/span.minimal__image__root (2).png"
  },
  {
    id: 4,
    title: "Community Health Camp In Sylhet Organized",
    description: "A free health camp was organized in Sylhet, providing essential medical checkups and medicine to over 500 underprivileged families...",
    date: "August 5, 2026",
    image: "/src/assets/span.minimal__image__root (3).png"
  },
  {
    id: 5,
    title: "3rd Imams' Training Completed",
    description: "The 3rd Imams' Training by the As-Sunnah Foundation has been successfully completed with the participation of selected Imams and...",
    date: "July 11, 2026",
    image: "/src/assets/span.minimal__image__root (4).png"
  },
  {
    id: 6,
    title: "Qurbani for All 2026 Project Completed",
    description: "Breaking all past records to bring Eid smiles to the faces of the country's underprivileged and disaster-affected people, the social...",
    date: "June 25, 2026",
    image: "/src/assets/span.minimal__image__root (5).png"
  }
];

function PublicNews() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>News & Articles</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          
          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input 
              type="text" 
              placeholder="Blog search" 
              className={styles.searchInput}
            />
          </div>

          <h2 className={styles.sectionTitle}>Featured News & Articles</h2>
          
          {/* Featured Article */}
          <NewsCard 
            featured={true}
            title="Relief distribution among flood victims in Greater..."
            description="A severe flood hit Chittagong in the first week of this month. Extensive areas in Chittagong, Cox's Bazar, and Bandarban were..."
            date="July 22, 2026"
            image="/src/assets/image 96.png"
          />

          <div className={styles.gridContainer}>
            {/* Sidebar Categories */}
            <aside className={styles.sidebar}>
              <ul className={styles.categoryList}>
                {CATEGORIES.map((cat, index) => (
                  <li key={index} className={index === 0 ? styles.activeCategory : ''}>
                    {cat}
                  </li>
                ))}
              </ul>
            </aside>

            {/* Articles Grid */}
            <div className={styles.articlesGrid}>
              {NEWS_DATA.map((news) => (
                <NewsCard 
                  key={news.id}
                  title={news.title}
                  description={news.description}
                  date={news.date}
                  image={news.image}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <Pagination currentPage={1} totalPages={512} />

        </div>
      </section>
    </div>
  );
}

export default PublicNews;
