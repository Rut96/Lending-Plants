import axios from 'axios';
import type {
  PlantSpecies,
  PlantDetailsResponse,
  ApiResponse,
} from '../types/plant';

const API_BASE_URL = 'https://perenual.com/api/v2';

class PlantApiService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_PERENUAL_API_KEY || '';
  }

  public async searchPlants(): Promise<PlantSpecies[]> {
    const response = await axios.get<ApiResponse<PlantSpecies>>(`${API_BASE_URL}/species-list`, {
      params: {
        key: this.apiKey,
        indoor: 1,
        page: 1,
      },
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
