import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bold, Italic, Underline, Type, List,
  Image as ImageIcon, Link as LinkIcon,
  UploadCloud, X, Trash2
} from 'lucide-react';
import styles from './AdminDashboardCreate.module.css';

const TAG_OPTIONS = ['News', 'Blog', 'Event', 'Health', 'Education', 'Community', 'Disaster'];

function AdminDashboardCreate() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_TITLE = 64;

  const handleFileSelect = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target.result);
    reader.readAsDataURL(file);
    setIsModalOpen(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFileSelect(file);
  };

  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      if (tags.length < 3) {
        setTags([...tags, tag]);
      } else {
        alert('You can only select up to 3 tags.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please provide a content title.');
      return;
    }
    alert('Content created successfully!');
    navigate('/admin/blog-news');
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumb Header */}
      <div className={styles.header}>
        <nav className={styles.breadcrumbs}>
          <span>Dashboard</span>
          <span className={styles.sep}>&rsaquo;</span>
          <span>Create New Content</span>
        </nav>
        <h1 className={styles.title}>Create New Blog &amp; News</h1>
      </div>

      <div className={styles.formCard}>

        {/* Content Title */}
        <div className={styles.field}>
          <label className={styles.label}>Content Title</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Plan name"
              className={styles.input}
              value={title}
              maxLength={MAX_TITLE}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className={styles.counter}>{title.length}/{MAX_TITLE}</span>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className={styles.toolbarBox}>
          <button type="button" className={styles.toolBtn} title="Bold"><Bold size={16} /></button>
          <button type="button" className={styles.toolBtn} title="Italic"><Italic size={16} /></button>
          <button type="button" className={styles.toolBtn} title="Underline"><Underline size={16} /></button>
          <button type="button" className={styles.toolBtn} title="Heading"><Type size={16} /></button>
          <button type="button" className={styles.toolBtn} title="List"><List size={16} /></button>
          <button type="button" className={styles.toolBtn} title="Add Image" onClick={() => setIsModalOpen(true)}>
            <ImageIcon size={16} />
          </button>
          <button type="button" className={styles.toolBtn} title="Add Link"><LinkIcon size={16} /></button>
        </div>

        {/* Content Body */}
        <div className={styles.field}>
          <label className={styles.label}>Content Body</label>
          <textarea
            placeholder="Type something...."
            className={styles.textarea}
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        {/* Tags Selection */}
        <div className={styles.field}>
          <label className={styles.label}>Tag (max 3)</label>
          <div className={styles.tagsInputWrapper}>
            <input
              type="text"
              placeholder="Plan name"
              className={styles.input}
              readOnly
              value={tags.join(', ')}
            />
          </div>
          <div className={styles.tagsOptions}>
            {TAG_OPTIONS.map((tag) => {
              const isSelected = tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  className={isSelected ? `${styles.tagChip} ${styles.tagChipActive}` : styles.tagChip}
                  onClick={() => toggleTag(tag)}
                >
                  {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Image Preview Card if uploaded */}
        {uploadedImage && (
          <div className={styles.uploadedPreviewCard}>
            <img src={uploadedImage} alt="Uploaded preview" className={styles.uploadedImg} />
            <button
              type="button"
              className={styles.removeImgBtn}
              onClick={() => setUploadedImage(null)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}

        {/* Form Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => navigate('/admin/blog-news')}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={handleSubmit}
          >
            Create Content
          </button>
        </div>

      </div>

      {/* Upload Modal Popup - Matches Figma Modal screenshot 1 */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div
            className={isDragging ? `${styles.modalCard} ${styles.dragging}` : styles.modalCard}
            onClick={(e) => e.stopPropagation()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
              <X size={16} />
            </button>

            <div className={styles.modalUploadCircle}>
              <UploadCloud size={24} color="#344054" />
            </div>

            <p className={styles.modalTitle}>Choose a file or drag &amp; drop it here</p>
            <p className={styles.modalSub}>PDF, JPG, JPEG, PNG . MAX (5MB)</p>

            <input
              type="file"
              accept="image/*,.pdf"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />

            <button className={styles.modalBrowseBtn} onClick={() => fileInputRef.current?.click()}>
              Browse File
            </button>

            <p className={styles.modalHint}>Recommended size: 1200x628px</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardCreate;
