import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bold, Italic, Underline, Type, List,
  Image as ImageIcon, Link as LinkIcon,
  UploadCloud, X, Trash2
} from 'lucide-react';
import styles from './AdminDashboardCreate.module.css';

const TAG_OPTIONS = ['News', 'Blog', 'Event', 'Health', 'Education', 'Community', 'Disaster'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function AdminDashboardCreate() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFormats, setActiveFormats] = useState({ bold: false, italic: false, underline: false });

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const MAX_TITLE = 64;

  const handleFileSelect = (file) => {
    if (!file) return;
    setUploadError('');

    // Validate file size (max 5MB)
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('File size exceeds 5MB. Please select a smaller image or document.');
      return;
    }

    // Validate file type (PDF, JPG, JPEG, PNG)
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Invalid file format. Please upload a PDF, JPG, JPEG, or PNG file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target.result);
    reader.readAsDataURL(file);
    setIsModalOpen(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
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

  // Lightweight rich text toolbar format appender
  const applyFormat = (syntax, key) => {
    setActiveFormats(prev => ({ ...prev, [key]: !prev[key] }));
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = body.substring(start, end);
    let formatted = '';

    if (syntax === 'list') {
      formatted = selectedText ? selectedText.split('\n').map(line => `• ${line}`).join('\n') : '• ';
    } else if (syntax === 'link') {
      formatted = selectedText ? `[${selectedText}](https://)` : '[Link title](https://)';
    } else {
      formatted = `${syntax}${selectedText || 'text'}${syntax}`;
    }

    const newText = body.substring(0, start) + formatted + body.substring(end);
    setBody(newText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please provide a content title.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert('Content created successfully!');
      navigate('/admin/blog-news');
    }, 600);
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
          <button
            type="button"
            className={activeFormats.bold ? `${styles.toolBtn} ${styles.toolActive}` : styles.toolBtn}
            title="Bold (**text**)"
            onClick={() => applyFormat('**', 'bold')}
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            className={activeFormats.italic ? `${styles.toolBtn} ${styles.toolActive}` : styles.toolBtn}
            title="Italic (*text*)"
            onClick={() => applyFormat('*', 'italic')}
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            className={activeFormats.underline ? `${styles.toolBtn} ${styles.toolActive}` : styles.toolBtn}
            title="Underline (__text__)"
            onClick={() => applyFormat('__', 'underline')}
          >
            <Underline size={16} />
          </button>
          <button
            type="button"
            className={styles.toolBtn}
            title="Heading (# Heading)"
            onClick={() => applyFormat('# ', 'heading')}
          >
            <Type size={16} />
          </button>
          <button
            type="button"
            className={styles.toolBtn}
            title="Bullet List (• item)"
            onClick={() => applyFormat('list', 'list')}
          >
            <List size={16} />
          </button>
          <button
            type="button"
            className={styles.toolBtn}
            title="Add Image"
            onClick={() => setIsModalOpen(true)}
          >
            <ImageIcon size={16} />
          </button>
          <button
            type="button"
            className={styles.toolBtn}
            title="Add Link ([text](url))"
            onClick={() => applyFormat('link', 'link')}
          >
            <LinkIcon size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className={styles.field}>
          <label className={styles.label}>Content Body</label>
          <textarea
            ref={textareaRef}
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
            disabled={isSubmitting}
            onClick={() => navigate('/admin/blog-news')}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.submitBtn}
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Creating...' : 'Create Content'}
          </button>
        </div>

      </div>

      {/* Upload Modal Popup */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => { setIsModalOpen(false); setUploadError(''); }}>
          <div
            className={isDragging ? `${styles.modalCard} ${styles.dragging}` : styles.modalCard}
            onClick={(e) => e.stopPropagation()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <button className={styles.closeBtn} onClick={() => { setIsModalOpen(false); setUploadError(''); }}>
              <X size={16} />
            </button>

            <div className={styles.modalUploadCircle}>
              <UploadCloud size={24} color="#344054" />
            </div>

            <p className={styles.modalTitle}>Choose a file or drag &amp; drop it here</p>
            <p className={styles.modalSub}>PDF, JPG, JPEG, PNG . MAX (5MB)</p>

            {uploadError && (
              <div style={{ background: '#fef3f2', border: '1px solid #fda29b', color: '#b42318', fontSize: '0.8rem', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '1rem' }}>
                {uploadError}
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg,application/pdf"
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
