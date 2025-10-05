import './HeroSection.css';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="hero-background-image" />
      <div className="container hero-container">
        <div className="hero-content fade-in">
          <h1>
            <span className="hero-title-line1">Health Plants</span>
            <span className="hero-title-line2">Happy Homes</span>
          </h1>
          <p className="hero-description">
            Discover the perfect indoor plants for your space, lifestyle, and experience level
          </p>
          <button className="cta-button" onClick={onCtaClick}>
            Find Your Plant
          </button>
        </div>
      </div>
    </section>
  );
}
