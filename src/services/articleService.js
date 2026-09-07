import { ARTICLES, CATEGORIES } from '../data/articles';

// Public REST API endpoint for demonstration
const API_URL = 'https://dummyjson.com/posts?limit=30';

/**
 * Deterministically maps DummyJSON post fields to our application's exact data structure.
 * Using deterministic modulo arithmetic on post.id ensures visual consistency across renders.
 */
function normalizePost(post) {
  // Map to the matching local article using modulo so content matches the Figma design
  const localArticle = ARTICLES[(post.id - 1) % ARTICLES.length];

  // Deterministic category pick from CATEGORIES array (skipping index 0 "All Gallery & Media")
  const categoryIndex = (post.id % (CATEGORIES.length - 1)) + 1;
  const category = localArticle ? localArticle.category : (CATEGORIES[categoryIndex] || CATEGORIES[1]);

  return {
    id: post.id,
    title: localArticle ? localArticle.title : post.title,
    description: localArticle ? localArticle.description : post.body,
    date: localArticle ? localArticle.date : `January ${post.id}, 2026`,
    time: `${(post.id % 12) + 1}:00 AM`,
    category: category,
    image: localArticle ? localArticle.image : ARTICLES[0].image,
    sourceLink: localArticle ? localArticle.sourceLink : 'https://example.com/news',
    tags: localArticle ? localArticle.tags : (Array.isArray(post.tags) && post.tags.length > 0 ? post.tags : ['News', 'Community'])
  };
}

/**
 * Fetches articles from external DummyJSON REST API with deterministic field mapping.
 * Automatically falls back to local ARTICLES dataset if network error, timeout, or non-OK response occurs.
 * 
 * @returns {Promise<{ articles: Array, isFallback: boolean, error: string|null }>}
 */
export async function fetchArticles() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

  try {
    const response = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.posts) || data.posts.length === 0) {
      throw new Error('Invalid API response format');
    }

    const normalizedArticles = data.posts.map(normalizePost);

    return {
      articles: normalizedArticles,
      isFallback: false,
      error: null
    };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('API fetch unavailable or failed. Using deterministic local fallback dataset:', err.message);
    
    // Graceful Fallback to local ARTICLES dataset
    return {
      articles: ARTICLES,
      isFallback: true,
      error: err.message
    };
  }
}
