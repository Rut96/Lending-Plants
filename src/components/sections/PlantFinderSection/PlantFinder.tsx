import { useState } from 'react';
import type { PlantFilters, LightLevel, TimeCommitment } from '../../../types/plant';
import { LIGHT_OPTIONS as lightOptions, TIME_OPTIONS as timeOptions } from '../../../types/plant';
import PlantFilterControl from '../../shared/PlantFilterControl';
import vineImage from '../../../assets/images/vine.png';
import './PlantFinder.css';

interface PlantFinderProps {
  onFilterChange: (filters: PlantFilters) => void;
}

export default function PlantFinder({ onFilterChange }: PlantFinderProps) {
  const [filters, setFilters] = useState<PlantFilters>({});

  const handleFilterChange = (key: keyof PlantFilters, value: string) => {
    const newFilters: PlantFilters = { ...filters };

    // If value is empty, remove the filter
    if (!value) {
      delete newFilters[key];
    } else {
      // Otherwise, set the filter
      if (key === 'light') {
        newFilters.light = value as LightLevel;
      } else if (key === 'time') {
        newFilters.time = value as TimeCommitment;
      }
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <section className="plant-finder-section">
      <div className="container">
        <div className="plant-finder-header">
          <h2>Find Your Perfect Plant</h2>
          <p>Answer a few questions to discover plants that match your lifestyle</p>
        </div>

        <div className="plant-finder-controls">
          <PlantFilterControl
            label="Where will you keep this plant?"
            options={lightOptions}
            value={filters.light || ''}
            onChange={(value) => handleFilterChange('light', value as LightLevel)}
            ariaLabel="Select light conditions"
          />

          <div className="plant-finder-separator">
            <img src={vineImage} alt="" aria-hidden="true" />
          </div>

          <PlantFilterControl
            label="How much time can you dedicate?"
            options={timeOptions}
            value={filters.time || ''}
            onChange={(value) => handleFilterChange('time', value as TimeCommitment)}
            ariaLabel="Select time commitment level"
          />
        </div>
      </div>
    </section>
  );
}
