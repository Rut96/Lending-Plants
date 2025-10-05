import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          Plant data powered by{' '}
          <a
            href="https://perenual.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Perenual API
          </a>
        </p>
        <p className="footer-secondary">
          Made for plant lovers everywhere 🌿
        </p>
      </div>
    </footer>
  );
}
