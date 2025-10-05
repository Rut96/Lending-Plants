import { Droplet, Sun, Package } from 'lucide-react';
import './PlantCareSection.css';

export default function PlantCareSection() {
  return (
    <section className="plant-care-section">
      <div className="container">
        <div className="care-header">
          <h2>Steps To Take Care Of Your <span className="highlight">Plants</span></h2>
          <p className="care-subtitle">
            By following these essential steps - proper watering, adequate sunlight, and providing nutrients -
            you'll be well on your way to maintaining healthy and thriving plants.
          </p>
        </div>

        <div className="care-steps">
          <div className="care-step">
            <div className="care-icon">
              <Droplet size={32} strokeWidth={2} />
            </div>
            <h3>Watering</h3>
            <p>
              Water your plants when the top inch of soil feels dry to the touch.
              Avoid overwatering, as it can lead to root issues and poor plant health.
            </p>
          </div>

          <div className="care-step">
            <div className="care-icon">
              <Sun size={32} strokeWidth={2} />
            </div>
            <h3>Sunlight</h3>
            <p>
              Most plants need adequate sunlight to thrive. Place your plants in areas
              that receive the appropriate amount of light for their specific needs.
            </p>
          </div>

          <div className="care-step">
            <div className="care-icon">
              <Package size={32} strokeWidth={2} />
            </div>
            <h3>Nutrients and Fertilizing</h3>
            <p>
              Choose a suitable fertilizer based on the specific needs of your plants,
              whether it's a balanced or specialized formula.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
