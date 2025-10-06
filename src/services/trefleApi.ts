import axios from 'axios';
import type { TreflePlant, TreflePlantDetails, TrefleApiResponse } from '../types/trefle';

const TREFLE_BASE_URL = 'https://trefle.io/api/v1';

class TrefleApiService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_TREFLE_API_KEY || '';
  }

  public async searchPlants(query?: string, page: number = 1): Promise<TreflePlant[]> {
    try {
      const params: Record<string, any> = {
        token: this.apiKey,
        page,
      };

      if (query) {
        params.q = query;
      }

      const response = await axios.get<TrefleApiResponse<TreflePlant>>(
        `${TREFLE_BASE_URL}/plants`,
        { params }
      );

      return response.data.data || [];
    } catch (error) {
      console.error('Trefle API search error:', error);
      return [];
    }
  }

  public async getPlantDetails(id: number): Promise<TreflePlantDetails | null> {
    try {
      const response = await axios.get<TreflePlantDetails>(
        `${TREFLE_BASE_URL}/plants/${id}`,
        {
          params: {
            token: this.apiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Trefle API details error:', error);
      return null;
    }
  }

  public async searchByFilters(filters: {
    edible?: boolean;
    indoor?: boolean;
    page?: number;
  }): Promise<TreflePlant[]> {
    try {
      const params: Record<string, any> = {
        token: this.apiKey,
        page: filters.page || 1,
      };

      if (filters.edible !== undefined) {
        params['filter[edible]'] = filters.edible;
      }

      const response = await axios.get<TrefleApiResponse<TreflePlant>>(
        `${TREFLE_BASE_URL}/plants`,
        { params }
      );

      return response.data.data || [];
    } catch (error) {
      console.error('Trefle API filter search error:', error);
      return [];
    }
  }
}

export const trefleApiService = new TrefleApiService();
