import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Plant3D from '../HeroSection/Plant3D';
import './FAQSection.css';

const faqs = [
  {
    id: 1,
    question: 'Where does the plant data come from?',
    answer: 'All plant information is sourced from the Perenual API, a comprehensive database of plant species with detailed care requirements and characteristics.'
  },
  {
    id: 2,
    question: 'How does the Plant Finder work?',
    answer: 'The finder uses your preferences for light conditions, time commitment, and experience level to filter through indoor plants. It maps these to specific care requirements like sunlight needs and watering frequency.'
  },
  {
    id: 3,
    question: 'Can I trust the care recommendations?',
    answer: 'Yes! Our recommendations come directly from the Perenual botanical database. However, always observe your specific plant\'s needs as conditions can vary by environment.'
  }
];

export default function FAQSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % faqs.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + faqs.length) % faqs.length);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <h2>Common Questions</h2>
        <div className="faq-layout">
          <div className="faq-slider">
            <div className="slider-wrapper">
              <div
                className="slider-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {faqs.map((faq) => (
                  <div key={faq.id} className="faq-card">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="slider-controls">
              <button
                className="slider-btn"
                onClick={prevCard}
                aria-label="Previous question"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="slider-dots">
                {faqs.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to question ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="slider-btn"
                onClick={nextCard}
                aria-label="Next question"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="faq-plant">
            <Plant3D />
          </div>
        </div>
      </div>
    </section>
  );
}
