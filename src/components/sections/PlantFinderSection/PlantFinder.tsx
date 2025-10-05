import { useState, useEffect } from 'react';
import { usePlantSearch, useDebounce } from '../../../hooks/usePlantSearch';
import type { PlantFilters, LightLevel, TimeCommitment, ExperienceLevel } from '../../../types/plant';
import SliderControl from '../../shared/SliderControl';
import PlantCard from '../../shared/PlantCard';
import CareModal from '../../shared/CareModal';
import './PlantFinder.css';

export default function PlantFinder() {
  const { plants, loading, error, search, getPlantDetails } = usePlantSearch();
  const [selectedPlantId, setSelectedPlantId] = useState<number | null>(null);

  const [filters, setFilters] = useState<PlantFilters>({
    light: 'medium' as LightLevel,
    time: 'medium' as TimeCommitment,
    experience: 'beginner' as ExperienceLevel,
  });

  // Debounce filter changes to reduce API calls
  const debouncedFilters = useDebounce(filters, 300);

  useEffect(() => {
    search(debouncedFilters);
  }, [debouncedFilters, search]);

  const handleFilterChange = (key: keyof PlantFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section id="plant-finder" className="plant-finder-section">
      <div className="container">
        <div className="plant-finder-header">
          <h2>Find Your Perfect Plant</h2>
          <p>Answer a few questions to discover plants that match your lifestyle</p>
        </div>

        <div className="plant-finder-controls">
          <SliderControl
            label="Light Conditions"
            options={['Low', 'Medium', 'High']}
            value={filters.light}
            onChange={(value) => handleFilterChange('light', value as LightLevel)}
            ariaLabel="Select light level preference"
          />

          <SliderControl
            label="Time Commitment"
            options={['Low', 'Medium', 'High']}
            value={filters.time}
            onChange={(value) => handleFilterChange('time', value as TimeCommitment)}
            ariaLabel="Select time commitment level"
          />

          <SliderControl
            label="Experience Level"
            options={['Beginner', 'Intermediate', 'Expert']}
            value={filters.experience}
            onChange={(value) => handleFilterChange('experience', value as ExperienceLevel)}
            ariaLabel="Select your experience level"
          />
        </div>

        {error && (
          <div className="plant-finder-error" role="alert">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="plant-finder-loading">
            <div className="spinner-large"></div>
            <p>Finding your perfect plants...</p>
          </div>
        ) : plants.length > 0 ? (
          <div className="plant-grid">
            {plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onViewCare={setSelectedPlantId}
              />
            ))}
          </div>
        ) : !error ? (
          <div className="plant-finder-empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <h3>No plants found</h3>
            <p>Try adjusting your filters to see more results</p>
          </div>
        ) : null}
      </div>

      <CareModal
        plantId={selectedPlantId}
        onClose={() => setSelectedPlantId(null)}
        getPlantDetails={getPlantDetails}
      />
    </section>
  );
}
