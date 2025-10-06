import './HeroSection.css';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="hero-background-image" />
      <div className="container hero-container">
        <div className="hero-content">
          <h1>
            <span className="hero-title-line1">Bring Nature</span>
            <span className="hero-title-line2">Into Your Home</span>
          </h1>
          <p className="hero-description">
            Find the perfect plant companion for your space and lifestyle
          </p>
          <button className="cta-button" onClick={onCtaClick}>
            Discover Plants
          </button>
        </div>
      </div>
    </section>
  );
}
