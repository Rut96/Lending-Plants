import axios from 'axios';
import type {
  PlantSpecies,
  PlantDetailsResponse,
  ApiResponse,
  PlantFilters,
} from '../types/plant';

const API_BASE_URL = 'https://perenual.com/api/v2';

class PlantApiService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_PERENUAL_API_KEY || '';
  }

  // Map our filter values to API parameters
  private mapFiltersToApiParams(filters?: PlantFilters): Record<string, any> {
    const params: Record<string, any> = {
      key: this.apiKey,
      indoor: 1,
      page: 1,
    };

    if (!filters) {
      return params;
    }

    // Map light level to sunlight API parameter
    const sunlightMap = {
      low: 'full_shade',
      medium: 'sun-part_shade',
      high: 'full_sun',
    };

    // Map time commitment to watering API parameter
    const wateringMap = {
      low: 'minimum',
      medium: 'average',
      high: 'frequent',
    };

    if (filters.light) {
      params.sunlight = sunlightMap[filters.light];
    }

    if (filters.time) {
      params.watering = wateringMap[filters.time];
    }

    // Experience level is client-side only (no API parameter)

    return params;
  }

  public async searchPlants(filters?: PlantFilters): Promise<PlantSpecies[]> {
    const params = this.mapFiltersToApiParams(filters);

    const response = await axios.get<ApiResponse<PlantSpecies>>(`${API_BASE_URL}/species-list`, {
      params,
    });

    return response.data.data || [];
  }

  public async getPlantDetails(id: number): Promise<PlantDetailsResponse> {
    const response = await axios.get<PlantDetailsResponse>(`${API_BASE_URL}/species/details/${id}`, {
      params: {
        key: this.apiKey,
      },
    });
    return response.data;
  }
}

export const plantApiService = new PlantApiService();
