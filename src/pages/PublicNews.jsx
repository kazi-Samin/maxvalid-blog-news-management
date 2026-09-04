import { useState } from 'react';
import { Search } from 'lucide-react';
import NewsCard from '../components/ui/NewsCard';
import Pagination from '../components/ui/Pagination';
import heroImage from '../assets/image 96.png';
import imgFeatured from '../assets/span.minimal__image__root.png';  // Tree planting - used for featured
import imgFloodBoat from '../assets/span.minimal__image__root (1).png';  // Orange rescuers carrying boat
import imgImams from '../assets/span.minimal__image__root (2).png';      // Kids No Smoking blue uniform
import imgQurbani from '../assets/span.minimal__image__root (3).png';    // Yellow helmet woman in flood
import imgQurbani2 from '../assets/span.minimal__image__root (4).png';   // Yellow helmet wider shot
import imgFloodBoat2 from '../assets/span.minimal__image__root (5).png'; // Orange rescuers wider
import styles from './PublicNews.module.css';

const CATEGORIES = [
  "All Gallery & Media", "Blood Donation", "Tree Plantation",
  "Education & Student Support", "Women Empowerment", "Disability Support",
  "Community Development", "Anti-Drug Awareness", "Travel & Tour Management",
  "Disaster", "Blanket Distribution During Winter", "Iftar Distribution",
  "Winter Clothing Distribution", "Safe Drinking Water", "Qurbani for Everyone",
  "Food Distribution", "Skills Development Training"
];

// 9 cards — 3 rows × 3 columns — exactly matching Figma
const NEWS_DATA = [
  // --- Row 1 ---
  {
    id: 1,
    title: "Relief distribution among flood victims in Greater...",
    description: "A severe flood hit Chittagong in the first week of this month. Extensive areas in Chittagong, Cox's Bazar, and Bandarban were...",
    date: "July 22, 2026",
    image: imgFloodBoat  // orange rescuers boat in flood
  },
  {
    id: 2,
    title: "3rd Imams' Training Completed",
    description: "The 3rd Imams' Training by the As-Sunnah Foundation has been successfully completed with the participation of selected Imams and...",
    date: "July 11, 2026",
    image: imgImams      // kids No Smoking blue uniform
  },
  {
    id: 3,
    title: "Qurbani for All 2026 Project Completed",
    description: "Breaking all past records to bring Eid smiles to the faces of the country's underprivileged and disaster-affected people, the social...",
    date: "June 25, 2026",
    image: imgQurbani    // yellow helmet woman in flood
  },
  // --- Row 2 ---
  {
    id: 4,
    title: "Community Health Camp In Sylhet Organized",
    description: "A free health camp was organized in Sylhet, providing essential medical checkups and medicine to over 500 underprivileged families...",
    date: "August 5, 2026",
    image: imgFeatured   // tree planting / community scene
  },
  {
    id: 5,
    title: "3rd Imams' Training Completed",
    description: "The 3rd Imams' Training by the As-Sunnah Foundation has been successfully completed with the participation of selected Imams and...",
    date: "July 11, 2026",
    image: imgImams
  },
  {
    id: 6,
    title: "Qurbani for All 2026 Project Completed",
    description: "Breaking all past records to bring Eid smiles to the faces of the country's underprivileged and disaster-affected people, the social...",
    date: "June 25, 2026",
    image: imgQurbani2   // yellow helmet wider shot
  },
  // --- Row 3 ---
  {
    id: 7,
    title: "Youth Empowerment Workshop Held Successfully",
    description: "The workshop focused on skill development and leadership training, empowering young participants from various communities.",
    date: "August 1, 2026",
    image: imgFloodBoat2 // orange rescuers wider view
  },
  {
    id: 8,
    title: "3rd Imams' Training Completed",
    description: "The 3rd Imams' Training by the As-Sunnah Foundation has been successfully completed with the participation of selected Imams and...",
    date: "July 11, 2026",
    image: imgImams
  },
  {
    id: 9,
    title: "Qurbani for All 2026 Project Completed",
    description: "Breaking all past records to bring Eid smiles to the faces of the country's underprivileged and disaster-affected people, the social...",
    date: "June 25, 2026",
    image: imgQurbani
  }
];

function PublicNews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);

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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Featured Article */}
          <h2 className={styles.sectionTitle}>Featured News &amp; Articles</h2>
          <NewsCard
            featured={true}
            title="Relief distribution among flood victims in Greater..."
            description="A severe flood hit Chittagong in the first week of this month. Extensive areas in Chittagong, Cox's Bazar, and Bandarban were..."
            date="July 22, 2026"
            image={imgFeatured}
          />

          {/* 2-col: Sidebar + 3-col Cards Grid */}
          <div className={styles.gridContainer}>
            <aside className={styles.sidebar}>
              <ul className={styles.categoryList}>
                {CATEGORIES.map((cat, index) => (
                  <li
                    key={index}
                    className={activeCategory === index ? styles.activeCategory : ''}
                    onClick={() => setActiveCategory(index)}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </aside>

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

          <Pagination currentPage={1} totalPages={512} />

        </div>
      </section>
    </div>
  );
}

export default PublicNews;
