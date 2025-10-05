import { useState, useEffect, useCallback, useMemo } from 'react';
import { plantApiService } from '../services/plantApi';
import type {
  PlantSpecies,
  PlantDetailsResponse,
  PlantFilters,
  FilterMappings,
  ExperienceLevel,
} from '../types/plant';

// Filter mappings
const FILTER_MAPPINGS: FilterMappings = {
  light: {
    low: ['full_shade', 'part_shade'],
    medium: ['sun-part_shade', 'part_shade'],
    high: ['full_sun'],
  },
  time: {
    low: ['minimum', 'none'],
    medium: ['average'],
    high: ['frequent'],
  },
};

interface UseePlantSearchResult {
  plants: PlantSpecies[];
  loading: boolean;
  error: string | null;
  search: (filters: PlantFilters) => Promise<void>;
  getPlantDetails: (id: number) => Promise<PlantDetailsResponse | null>;
}

export function usePlantSearch(): UseePlantSearchResult {
  const [plants, setPlants] = useState<PlantSpecies[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cache for plant details
  const detailsCache = useMemo(() => new Map<number, PlantDetailsResponse>(), []);

  const filterByExperience = useCallback(
    (plants: PlantSpecies[], level: ExperienceLevel): PlantSpecies[] => {
      // For now, return all plants regardless of experience level
      // The API filters by sunlight and watering are enough
      return plants;

      /* Original filtering logic - too restrictive for demo
      if (level === 'beginner') {
        return plants.filter((plant) => {
          const hasEasyWatering = ['minimum', 'average', 'none'].includes(
            plant.watering?.toLowerCase() || ''
          );
          const hasEasySunlight = !plant.sunlight?.some((s) =>
            s.toLowerCase().includes('full_sun')
          );
          return hasEasyWatering || hasEasySunlight;
        });
      } else if (level === 'expert') {
        return plants.filter((plant) => {
          const needsFrequentWatering = plant.watering?.toLowerCase() === 'frequent';
          const needsFullSun = plant.sunlight?.some((s) =>
            s.toLowerCase().includes('full_sun')
          );
          return needsFrequentWatering || needsFullSun;
        });
      }
      return plants;
      */
    },
    []
  );

  const search = useCallback(
    async (filters: PlantFilters) => {
      setLoading(true);
      setError(null);

      try {
        // Call API service
        const results = await plantApiService.searchPlants();

        // Apply experience level filter client-side
        const filteredPlants = filterByExperience(results, filters.experience);

        setPlants(filteredPlants);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch plants';
        setError(errorMessage);
        console.error('Plant search error:', err);
      } finally {
        setLoading(false);
      }
    },
    [filterByExperience]
  );

  const getPlantDetails = useCallback(
    async (id: number): Promise<PlantDetailsResponse | null> => {
      // Check cache first
      if (detailsCache.has(id)) {
        return detailsCache.get(id)!;
      }

      try {
        const details = await plantApiService.getPlantDetails(id);

        // Cache the result
        detailsCache.set(id, details);

        return details;
      } catch (err) {
        console.error('Failed to fetch plant details:', err);
        return null;
      }
    },
    [detailsCache]
  );

  return {
    plants,
    loading,
    error,
    search,
    getPlantDetails,
  };
}

// Debounce utility hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
