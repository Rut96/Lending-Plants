import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './MainLayout.css';

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top without animation when page changes
    window.scrollTo(0, 0);

    // Add scroll animations - re-run when location changes
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Use setTimeout to ensure DOM is ready after route change
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((el) => observer.observe(el));
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
