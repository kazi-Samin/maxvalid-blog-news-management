import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bold, Italic, Underline, Type, List, Image as ImageIcon, Link as LinkIcon, UploadCloud, X, Trash2 } from 'lucide-react';
import styles from './AdminDashboardCreate.module.css';

function AdminDashboardCreate() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Mocking an image upload by just selecting the hero image for demonstration
  const handleSimulatedUpload = () => {
    setUploadedImage('/src/assets/span.minimal__image__root.png');
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumbs & Header */}
      <div className={styles.header}>
        <div className={styles.breadcrumbs}>
          <span>Dashboard</span> &gt; <span>Create New Content</span>
        </div>
        <h1 className={styles.title}>Create New Blog & News</h1>
      </div>

      <div className={styles.formContainer}>
        
        {/* Content Title */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Content Title</label>
          <div className={styles.inputWrapper}>
            <input 
              type="text" 
              placeholder="Plan name" 
              className={styles.input} 
            />
            <span className={styles.charCount}>0 / 64</span>
          </div>
        </div>

        {/* Rich Text Editor Mockup */}
        <div className={styles.formGroup}>
          <div className={styles.toolbar}>
            <button className={styles.toolbarBtn} title="Bold"><Bold size={16} /></button>
            <button className={styles.toolbarBtn} title="Italic"><Italic size={16} /></button>
            <button className={styles.toolbarBtn} title="Underline"><Underline size={16} /></button>
            <button className={styles.toolbarBtn} title="Text"><Type size={16} /></button>
            <button className={styles.toolbarBtn} title="List"><List size={16} /></button>
            <button 
              className={styles.toolbarBtn} 
              title="Upload Image"
              onClick={() => setIsModalOpen(true)}
            >
              <ImageIcon size={16} />
            </button>
            <button className={styles.toolbarBtn} title="Insert Link"><LinkIcon size={16} /></button>
          </div>
          <label className={styles.label}>Content Body</label>
          <textarea 
            className={styles.textarea} 
            placeholder="Type something..."
            rows={12}
          ></textarea>
        </div>

        {/* Tags */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Tag (max 3)</label>
          <input 
            type="text" 
            placeholder="Plan name" 
            className={styles.input} 
          />
        </div>

        {/* Image Preview */}
        {uploadedImage && (
          <div className={styles.imagePreviewWrapper}>
            <img src={uploadedImage} alt="Uploaded" className={styles.imagePreview} />
            <button 
              className={styles.deleteImageBtn} 
              onClick={() => setUploadedImage(null)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}

        {/* Form Actions */}
        <div className={styles.formActions}>
          <button 
            className={styles.cancelBtn}
            onClick={() => navigate('/admin/content')}
          >
            Cancel
          </button>
          <button className={styles.submitBtn}>
            Create Content
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button 
              className={styles.closeModalBtn} 
              onClick={() => setIsModalOpen(false)}
            >
              <X size={20} />
            </button>
            
            <div className={styles.modalContent}>
              <div className={styles.uploadIconWrapper}>
                <UploadCloud size={40} color="#6c757d" />
              </div>
              <p className={styles.modalText}>Choose a file or drag & drop it here</p>
              <p className={styles.modalSubText}>PDF, JPG, JPEG, PNG . MAX (5MB)</p>
              
              <button 
                className={styles.browseBtn}
                onClick={handleSimulatedUpload}
              >
                Browse File
              </button>
              
              <p className={styles.modalHint}>Recommended size: 1200x628px</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardCreate;
