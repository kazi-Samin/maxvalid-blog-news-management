import styles from './NewsCard.module.css';

function NewsCard({ image, title, description, date, featured = false }) {
  if (featured) {
    return (
      <div className={styles.featuredCard}>
        <div className={styles.featuredImageWrapper}>
          <img src={image} alt={title} className={styles.image} />
        </div>
        <div className={styles.featuredContent}>
          <h2 className={styles.featuredTitle}>{title}</h2>
          <p className={styles.featuredDesc}>{description}</p>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
        <div className={styles.date}>{date}</div>
      </div>
    </div>
  );
}

export default NewsCard;
