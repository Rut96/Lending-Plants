import { plantApiService } from './plantApi';
import { trefleApiService } from './trefleApi';
import { localPlantDataService } from './localPlantData';
import type { PlantSpecies, PlantFilters } from '../types/plant';
import type { UnifiedPlant, TreflePlantDetails } from '../types/trefle';

class UnifiedPlantApiService {
  // Convert Perenual plant to unified format
  private mapPerenualToUnified(plant: PlantSpecies): UnifiedPlant {
    return {
      id: `perenual-${plant.id}`,
      sourceApi: 'perenual',
      originalId: plant.id,
      commonName: plant.common_name,
      scientificName: plant.scientific_name,
      imageUrl: plant.default_image?.regular_url || plant.default_image?.thumbnail || null,
      watering: plant.watering,
      sunlight: plant.sunlight,
      cycle: plant.cycle,
      rawData: plant,
    };
  }


  // Map Trefle plant details to unified format
  private mapTrefleDetailsToUnified(details: TreflePlantDetails): UnifiedPlant {
    const plant = details.data;

    return {
      id: `trefle-${plant.id}`,
      sourceApi: 'trefle',
      originalId: plant.id,
      commonName: plant.common_name || plant.scientific_name,
      scientificName: plant.scientific_name,
      imageUrl: plant.image_url,
      images: plant.images,
      duration: plant.duration || undefined,
      edible: plant.edible,
      ediblePart: plant.edible_part || undefined,
      family: plant.family,
      genus: plant.genus,
      author: plant.author,
      growthRate: plant.specifications?.growth_rate || undefined,
      averageHeight: plant.specifications?.average_height || undefined,
      toxicity: plant.specifications?.toxicity || undefined,
      lightLevel: plant.growth?.light || undefined,
      phRange: plant.growth
        ? {
            min: plant.growth.ph_minimum,
            max: plant.growth.ph_maximum,
          }
        : undefined,
      temperatureRange: plant.growth
        ? {
            min: {
              degC: plant.growth.minimum_temperature?.deg_c || null,
              degF: plant.growth.minimum_temperature?.deg_f || null,
            },
            max: {
              degC: plant.growth.maximum_temperature?.deg_c || null,
              degF: plant.growth.maximum_temperature?.deg_f || null,
            },
          }
        : undefined,
      rawData: plant,
    };
  }

  // Search plants - use local data first, fallback to Perenual if available
  public async searchPlants(filters?: PlantFilters): Promise<UnifiedPlant[]> {
    try {
      // Try Perenual API first
      const perenualPlants = await plantApiService.searchPlants(filters);

      if (perenualPlants.length > 0) {
        console.log('✅ Using Perenual API data:', perenualPlants.length, 'plants');
        return perenualPlants.map((p) => this.mapPerenualToUnified(p));
      }

      // Fallback to local data
      console.log('📦 Perenual unavailable, using local plant data');
      return localPlantDataService.searchPlants(filters);
    } catch (error) {
      console.error('Unified search error, falling back to local data:', error);
      // Fallback to local data
      return localPlantDataService.searchPlants(filters);
    }
  }

  // Get plant details, trying APIs or local data
  public async getPlantDetails(id: string): Promise<UnifiedPlant | null> {
    const [source, originalId] = id.split('-');

    // Handle local data
    if (source === 'local') {
      return localPlantDataService.getPlantById(id);
    }

    const numericId = parseInt(originalId, 10);

    if (source === 'trefle') {
      const details = await trefleApiService.getPlantDetails(numericId);
      return details ? this.mapTrefleDetailsToUnified(details) : null;
    } else {
      try {
        const details = await plantApiService.getPlantDetails(numericId);
        if (!details) return null;

        // Try to enrich with Trefle data
        const trefleResults = await trefleApiService.searchPlants(details.common_name);
        if (trefleResults.length > 0) {
          const trefleDetails = await trefleApiService.getPlantDetails(trefleResults[0].id);
          if (trefleDetails) {
            const unified = this.mapTrefleDetailsToUnified(trefleDetails);
            // Merge Perenual data
            return {
              ...unified,
              watering: details.watering,
              sunlight: details.sunlight,
              cycle: details.cycle,
              careLevel: details.care_level || undefined,
              description: details.description || undefined,
            };
          }
        }

        // Return Perenual-only data
        return {
          id: `perenual-${numericId}`,
          sourceApi: 'perenual',
          originalId: numericId,
          commonName: details.common_name,
          scientificName: details.scientific_name,
          imageUrl: details.default_image?.regular_url || null,
          watering: details.watering,
          sunlight: details.sunlight,
          cycle: details.cycle,
          careLevel: details.care_level || undefined,
          description: details.description || undefined,
          rawData: details,
        };
      } catch (error) {
        console.error('Error fetching plant details:', error);
        return null;
      }
    }
  }

}

export const unifiedPlantApiService = new UnifiedPlantApiService();
