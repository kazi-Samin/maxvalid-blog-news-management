import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bold, Italic, Underline, Type, List,
  Image as ImageIcon, Link as LinkIcon,
  UploadCloud, X, Trash2, ChevronDown
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
      setTags(tags.filter(t => t !== tag));
    } else if (tags.length < 3) {
      setTags([...tags, tag]);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <nav className={styles.breadcrumbs}>
          <span>Dashboard</span>
          <span className={styles.sep}>&rsaquo;</span>
          <span>Content Management</span>
          <span className={styles.sep}>&rsaquo;</span>
          <span className={styles.current}>Create New Content</span>
        </nav>
        <h1 className={styles.title}>Create New Blog &amp; News</h1>
      </div>

      <div className={styles.formCard}>

        {/* Title Field */}
        <div className={styles.field}>
          <label className={styles.label}>Content Title</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Enter content title..."
              className={styles.input}
              maxLength={MAX_TITLE}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className={styles.charCount}>{title.length} / {MAX_TITLE}</span>
          </div>
        </div>

        {/* Rich Text Toolbar + Body */}
        <div className={styles.field}>
          <label className={styles.label}>Content Body</label>
          <div className={styles.editor}>
            <div className={styles.toolbar}>
              <button className={styles.toolBtn} title="Bold"><Bold size={15} /></button>
              <button className={styles.toolBtn} title="Italic"><Italic size={15} /></button>
              <button className={styles.toolBtn} title="Underline"><Underline size={15} /></button>
              <div className={styles.toolDivider} />
              <button className={styles.toolBtn} title="Heading"><Type size={15} /></button>
              <button className={styles.toolBtn} title="List"><List size={15} /></button>
              <div className={styles.toolDivider} />
              <button
                className={styles.toolBtn}
                title="Upload Image"
                onClick={() => setIsModalOpen(true)}
              >
                <ImageIcon size={15} />
              </button>
              <button className={styles.toolBtn} title="Insert Link"><LinkIcon size={15} /></button>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Type your content here..."
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </div>

        {/* Tags */}
        <div className={styles.field}>
          <label className={styles.label}>Tags <span className={styles.tagNote}>(max 3)</span></label>
          <div className={styles.tagContainer}>
            {TAG_OPTIONS.map(tag => (
              <button
                key={tag}
                className={`${styles.tagChip} ${tags.includes(tag) ? styles.tagActive : ''}`}
                onClick={() => toggleTag(tag)}
                disabled={!tags.includes(tag) && tags.length >= 3}
              >
                {tag}
              </button>
            ))}
          </div>
          {tags.length > 0 && (
            <div className={styles.selectedTags}>
              {tags.map(tag => (
                <span key={tag} className={styles.selectedTag}>
                  {tag}
                  <button onClick={() => toggleTag(tag)} className={styles.removeTag}><X size={11} /></button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Uploaded Image Preview */}
        {uploadedImage && (
          <div className={styles.field}>
            <label className={styles.label}>Uploaded Image</label>
            <div className={styles.imagePreviewBox}>
              <img src={uploadedImage} alt="Preview" className={styles.previewImg} />
              <button className={styles.removeImgBtn} onClick={() => setUploadedImage(null)}>
                <Trash2 size={15} /> Remove
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={() => navigate('/admin/content')}>
            Cancel
          </button>
          <button className={styles.submitBtn}>
            Create Content
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className={styles.overlay} onClick={() => setIsModalOpen(false)}>
          <div
            className={`${styles.modal} ${isDragging ? styles.dragging : ''}`}
            onClick={(e) => e.stopPropagation()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>
            <div className={styles.uploadIcon}>
              <UploadCloud size={44} strokeWidth={1.5} color="#adb5bd" />
            </div>
            <p className={styles.uploadTitle}>Choose a file or drag &amp; drop it here</p>
            <p className={styles.uploadSub}>PDF, JPG, JPEG, PNG &nbsp;•&nbsp; Max 5MB</p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
            <button className={styles.browseBtn} onClick={() => fileInputRef.current?.click()}>
              Browse File
            </button>
            <p className={styles.uploadHint}>Recommended size: 1200×628px</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardCreate;
