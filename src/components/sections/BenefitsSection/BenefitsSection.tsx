import { Sun, FileText, PawPrint, Sprout } from 'lucide-react';
import './BenefitsSection.css';
import plant1 from '../../../assets/images/plant1.png';
import plant2 from '../../../assets/images/plant2.png';
import plant3 from '../../../assets/images/plant3.png';

export default function BenefitsSection() {
  return (
    <section className="benefits-section">
      <div className="container fade-in">
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <Sun size={32} strokeWidth={2} />
            </div>
            <h3>Pick by Conditions</h3>
            <p>Filter plants based on your home's light and your available time</p>
          </div>

          <div className="benefit-separator">
            <img src={plant1} alt="" className="separator-plant" />
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <FileText size={32} strokeWidth={2} />
            </div>
            <h3>Care Cards</h3>
            <p>Detailed care instructions for each plant species</p>
          </div>

          <div className="benefit-separator">
            <img src={plant2} alt="" className="separator-plant" />
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <PawPrint size={32} strokeWidth={2} />
            </div>
            <h3>Pet Awareness</h3>
            <p>See which plants are safe for your furry friends</p>
          </div>

          <div className="benefit-separator">
            <img src={plant3} alt="" className="separator-plant" />
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <Sprout size={32} strokeWidth={2} />
            </div>
            <h3>Beginner-Friendly</h3>
            <p>Perfect for those starting their plant parent journey</p>
          </div>
        </div>
      </div>
    </section>
  );
}
