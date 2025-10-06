import { useEffect, useState } from 'react';
import { usePlantSearch, useDebounce } from '../../../hooks/usePlantSearch';
import PlantFinder from '../../sections/PlantFinderSection/PlantFinder';
import PlantCards from '../../sections/PlantCardsSection/PlantCards';
import type { PlantFilters } from '../../../types/plant';
import './Plants.css';

export default function Plants() {
  const { plants, loading, error, search, getPlantDetails } = usePlantSearch();
  const [filters, setFilters] = useState<PlantFilters>({});

  // Debounce filter changes to reduce API calls
  const debouncedFilters = useDebounce(filters, 300);

  // Load plants on initial mount and when filters change
  useEffect(() => {
    search(debouncedFilters);
  }, [debouncedFilters, search]);

  const handleFilterChange = (newFilters: PlantFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="plants-page">
      <PlantFinder onFilterChange={handleFilterChange} />

      <section className="plant-cards-section">
        <div className="container">
          <PlantCards
            plants={plants}
            loading={loading}
            error={error}
            getPlantDetails={getPlantDetails}
          />
        </div>
      </section>
    </div>
  );
}
