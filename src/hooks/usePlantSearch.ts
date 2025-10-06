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

  const applyExperienceFilter = useCallback(
    (plants: PlantSpecies[], experience?: ExperienceLevel): PlantSpecies[] => {
      // If no experience filter, return all plants
      if (!experience) {
        return plants;
      }

      // Apply experience-based filtering
      return plants.filter((plant) => {
        const watering = plant.watering?.toLowerCase() || '';

        if (experience === 'beginner') {
          // Beginners: easy watering (not frequent)
          return ['minimum', 'average', 'none'].includes(watering);
        } else if (experience === 'intermediate') {
          // Intermediate: average to frequent
          return ['average', 'frequent'].includes(watering);
        }
        // Expert: show all plants
        return true;
      });
    },
    []
  );

  const search = useCallback(
    async (filters: PlantFilters) => {
      setLoading(true);
      setError(null);

      try {
        // Call API service with light and time filters
        // (API handles sunlight and watering parameters)
        const results = await plantApiService.searchPlants(filters);

        // Apply client-side experience level filtering
        const filteredPlants = applyExperienceFilter(results, filters.experience);

        setPlants(filteredPlants);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch plants';
        setError(errorMessage);
        console.error('Plant search error:', err);
      } finally {
        setLoading(false);
      }
    },
    [applyExperienceFilter]
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
