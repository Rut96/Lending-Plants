import { useState } from 'react';
import type { UnifiedPlant } from '../../types/trefle';
import './PlantCard.css';

interface PlantCardProps {
  plant: UnifiedPlant;
  onViewCare: (plantId: string) => void;
}

export default function PlantCard({ plant, onViewCare }: PlantCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Use imageUrl directly (from search results or details)
  // Detailed images (flower, leaf, etc.) only available when viewing details
  const imageUrl = plant.imageUrl;

  // Format sunlight display
  const formatSunlight = (sunlight: string): string => {
    return sunlight.replace(/-/g, ' ').replace(/_/g, ' ');
  };

  const sunlightDisplay = Array.isArray(plant.sunlight) && plant.sunlight.length > 0
    ? formatSunlight(plant.sunlight[0])
    : plant.lightLevel
    ? `Level ${plant.lightLevel}/10`
    : null;

  const wateringDisplay = plant.watering || null;

  return (
    <article className="plant-card">
      <div className="plant-card-image-wrapper">
        {!imageError && imageUrl ? (
          <>
            {!imageLoaded && <div className="plant-card-image-skeleton skeleton" />}
            <img
              src={imageUrl}
              alt={plant.commonName}
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
        <h3 className="plant-card-title">{plant.commonName}</h3>

        {plant.scientificName && (
          <p className="plant-card-subtitle">
            {Array.isArray(plant.scientificName) ? plant.scientificName[0] : plant.scientificName}
          </p>
        )}

        <div className="plant-card-badges">
          {sunlightDisplay && (
            <span className="plant-badge plant-badge-light" aria-label={`Light: ${sunlightDisplay}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              {sunlightDisplay}
            </span>
          )}

          {wateringDisplay && (
            <span className="plant-badge plant-badge-water" aria-label={`Watering: ${wateringDisplay}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              {wateringDisplay}
            </span>
          )}

          {plant.edible && (
            <span className="plant-badge plant-badge-edible" aria-label="Edible plant">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              </svg>
              Edible
            </span>
          )}
        </div>

        <button
          className="plant-card-button"
          onClick={() => onViewCare(plant.id)}
          aria-label={`View care plan for ${plant.commonName}`}
        >
          View Details
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </article>
  );
}
