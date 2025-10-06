import { useState, useEffect, useCallback, useMemo } from 'react';
import { unifiedPlantApiService } from '../services/unifiedPlantApi';
import type {
  PlantFilters,
  ExperienceLevel,
} from '../types/plant';
import type { UnifiedPlant } from '../types/trefle';

interface UseePlantSearchResult {
  plants: UnifiedPlant[];
  loading: boolean;
  error: string | null;
  search: (filters: PlantFilters) => Promise<void>;
  getPlantDetails: (id: string) => Promise<UnifiedPlant | null>;
}

export function usePlantSearch(): UseePlantSearchResult {
  const [plants, setPlants] = useState<UnifiedPlant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cache for plant details
  const detailsCache = useMemo(() => new Map<string, UnifiedPlant>(), []);

  const applyExperienceFilter = useCallback(
    (plants: UnifiedPlant[], experience?: ExperienceLevel): UnifiedPlant[] => {
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
        // Call unified API service to get plants from both Perenual and Trefle
        const results = await unifiedPlantApiService.searchPlants(filters);

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
    async (id: string): Promise<UnifiedPlant | null> => {
      // Check cache first
      if (detailsCache.has(id)) {
        return detailsCache.get(id)!;
      }

      try {
        const details = await unifiedPlantApiService.getPlantDetails(id);

        // Cache the result
        if (details) {
          detailsCache.set(id, details);
        }

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
