import { useState } from 'react';
import PlantCard from '../../shared/PlantCard';
import CareModal from '../../shared/CareModal';
import type { UnifiedPlant } from '../../../types/trefle';
import './PlantCards.css';

interface PlantCardsProps {
  plants: UnifiedPlant[];
  loading: boolean;
  error: string | null;
  getPlantDetails: (id: string) => Promise<UnifiedPlant | null>;
}

export default function PlantCards({ plants, loading, error, getPlantDetails }: PlantCardsProps) {
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="plant-cards-loading">
        <div className="spinner-large"></div>
        <p>Finding your perfect plants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="plant-cards-error" role="alert">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
        <p>{error}</p>
      </div>
    );
  }

  if (plants.length === 0) {
    return (
      <div className="plant-cards-empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <h3>No plants found</h3>
        <p>Try adjusting your filters to see more results</p>
      </div>
    );
  }

  return (
    <>
      <div className="plant-grid">
        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onViewCare={setSelectedPlantId}
          />
        ))}
      </div>

      <CareModal
        plantId={selectedPlantId}
        onClose={() => setSelectedPlantId(null)}
        getPlantDetails={getPlantDetails}
      />
    </>
  );
}
