import { Link } from 'react-router-dom';

export default function PlaceholderPage({ title, description = "This page is part of the Bandhan Paribar platform. Full page design is not specified in the assignment PDF." }) {
  return (
    <div style={{
      maxWidth: '900px',
      margin: '6rem auto 4rem',
      padding: '3rem 2rem',
      background: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #eaecf0',
      boxShadow: '0 4px 20px rgba(16, 24, 40, 0.05)',
      textAlign: 'center'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: '#e1eeff',
        color: '#0084d4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.8rem',
        margin: '0 auto 1.5rem'
      }}>
        ✨
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#101828', marginBottom: '0.75rem' }}>
        {title}
      </h1>
      <p style={{ color: '#475467', fontSize: '1rem', lineHeight: 1.6, maxWidth: '540px', margin: '0 auto 2rem' }}>
        {description}
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#0084d4',
          color: '#ffffff',
          padding: '0.75rem 1.75rem',
          borderRadius: '8px',
          fontWeight: 600,
          textDecoration: 'none',
          fontSize: '0.95rem'
        }}
      >
        ← Return to Home
      </Link>
    </div>
  );
}
