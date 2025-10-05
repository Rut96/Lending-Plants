import './FAQSection.css';

export default function FAQSection() {
  return (
    <section className="faq-section fade-in">
      <div className="container">
        <h2>Common Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>Where does the plant data come from?</h3>
            <p>
              All plant information is sourced from the Perenual API, a comprehensive database
              of plant species with detailed care requirements and characteristics.
            </p>
          </div>

          <div className="faq-item">
            <h3>How does the Plant Finder work?</h3>
            <p>
              The finder uses your preferences for light conditions, time commitment, and
              experience level to filter through indoor plants. It maps these to specific care
              requirements like sunlight needs and watering frequency.
            </p>
          </div>

          <div className="faq-item">
            <h3>Can I trust the care recommendations?</h3>
            <p>
              Yes! Our recommendations come directly from the Perenual botanical database.
              However, always observe your specific plant's needs as conditions can vary by
              environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
