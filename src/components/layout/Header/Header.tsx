import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          Pocket Garden
        </Link>

        <nav className="nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/plants"
            className={`nav-link ${location.pathname === '/plants' ? 'active' : ''}`}
          >
            Plants
          </Link>
        </nav>
      </div>
    </header>
  );
}
