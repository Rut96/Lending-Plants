import { useState } from 'react';
import type { PlantSpecies } from '../../types/plant';
import './PlantCard.css';

interface PlantCardProps {
  plant: PlantSpecies;
  onViewCare: (plantId: number) => void;
}

export default function PlantCard({ plant, onViewCare }: PlantCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = plant.default_image?.thumbnail || plant.default_image?.small_url;
  const sunlightDisplay = plant.sunlight?.[0] || 'Unknown';
  const wateringDisplay = plant.watering || 'Unknown';

  const formatSunlight = (sunlight: string): string => {
    return sunlight.replace(/-/g, ' ').replace(/_/g, ' ');
  };

  return (
    <article className="plant-card">
      <div className="plant-card-image-wrapper">
        {!imageError && imageUrl ? (
          <>
            {!imageLoaded && <div className="plant-card-image-skeleton skeleton" />}
            <img
              src={imageUrl}
              alt={plant.common_name}
              className={`plant-card-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          </>
        ) : (
          <div className="plant-card-image-placeholder">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        )}
      </div>

      <div className="plant-card-content">
        <h3 className="plant-card-title">{plant.common_name}</h3>

        <div className="plant-card-badges">
          <span className="plant-badge plant-badge-light" aria-label={`Light: ${sunlightDisplay}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            {formatSunlight(sunlightDisplay)}
          </span>

          <span className="plant-badge plant-badge-water" aria-label={`Watering: ${wateringDisplay}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            {wateringDisplay}
          </span>
        </div>

        <button
          className="plant-card-button"
          onClick={() => onViewCare(plant.id)}
          aria-label={`View care plan for ${plant.common_name}`}
        >
          Care Plan
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </article>
  );
}
