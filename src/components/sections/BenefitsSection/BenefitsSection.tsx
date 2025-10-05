import './BenefitsSection.css';

export default function BenefitsSection() {
  return (
    <section className="benefits-section fade-in">
      <div className="container">
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3>Pick by Conditions</h3>
            <p>Filter plants based on your home's light and your available time</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3>Care Cards</h3>
            <p>Get detailed care instructions tailored to each plant species</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8.5" cy="6.5" r="2.5" />
                <circle cx="15.5" cy="6.5" r="2.5" />
                <path d="M12 16c-1.5 0-3-1-4-2.5-1-1.5-1-3 0-4.5s2.5-2.5 4-2.5 3 1 4 2.5 1 3 0 4.5-2.5 2.5-4 2.5z" />
              </svg>
            </div>
            <h3>Pet Awareness</h3>
            <p>See which plants are safe for your furry friends</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Beginner-Friendly</h3>
            <p>Perfect for those starting their plant parent journey</p>
          </div>
        </div>
      </div>
    </section>
  );
}
