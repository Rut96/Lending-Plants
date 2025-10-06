import plantsData from '../plants_merged.json';
import type { UnifiedPlant } from '../types/trefle';
import type { PlantFilters } from '../types/plant';

// Local plant data structure from JSON
interface LocalPlant {
  id: string;
  name: string;
  latin: string;
  aliases: string[];
  categories: string[];
  toxicity: {
    to_pets: boolean;
    to_humans: boolean;
  };
  images: {
    primary: string;
    gallery: string[];
  };
  care: {
    light: {
      level: string;
      lux_min: number;
      lux_max: number;
      notes: string;
    };
    watering: {
      level: string;
      per_week_min: number;
      per_week_max: number;
      notes: string;
    };
    soil_moisture: {
      target_min: number;
      target_max: number;
    };
    humidity: {
      target_min: number;
      target_max: number;
    };
    temperature_c: {
      min: number;
      max: number;
    };
    fertilizer: {
      frequency_per_month: number;
      season: string;
    };
  };
  difficulty: number;
  sources: string[];
  notes?: string;
}

class LocalPlantDataService {
  private plants: LocalPlant[];

  constructor() {
    this.plants = plantsData.plants as LocalPlant[];
  }

  // Convert local plant to unified format
  private mapToUnified(plant: LocalPlant): UnifiedPlant {
    // Map light level to sunlight array
    const lightLevelMap: Record<string, string[]> = {
      'low': ['full_shade', 'part_shade'],
      'low-medium': ['part_shade'],
      'medium': ['sun-part_shade'],
      'medium-high': ['sun-part_shade', 'full_sun'],
      'high': ['full_sun'],
      'low-high': ['full_shade', 'part_shade', 'sun-part_shade', 'full_sun'],
    };

    return {
      id: `local-${plant.id}`,
      sourceApi: 'perenual',
      originalId: plant.id.hashCode(), // Generate numeric ID from string
      commonName: plant.name,
      scientificName: plant.latin,
      imageUrl: plant.images.primary, // Use all images from JSON including placeholders
      sunlight: lightLevelMap[plant.care.light.level] || ['sun-part_shade'],
      watering: plant.care.watering.level,
      family: plant.categories.join(', '),
      toxicity: plant.toxicity.to_pets
        ? '⚠️ Toxic to pets'
        : plant.toxicity.to_humans
        ? '⚠️ Toxic to humans'
        : '✅ Non-toxic',
      careLevel: this.mapDifficulty(plant.difficulty),
      description: plant.notes,
      temperatureRange: {
        min: { degC: plant.care.temperature_c.min, degF: this.celsiusToFahrenheit(plant.care.temperature_c.min) },
        max: { degC: plant.care.temperature_c.max, degF: this.celsiusToFahrenheit(plant.care.temperature_c.max) },
      },
      rawData: plant,
    };
  }

  private celsiusToFahrenheit(celsius: number): number {
    return Math.round((celsius * 9/5) + 32);
  }

  private mapDifficulty(difficulty: number): string {
    if (difficulty <= 2) return 'easy';
    if (difficulty <= 3) return 'moderate';
    return 'difficult';
  }

  // Filter plants based on user filters
  public searchPlants(filters?: PlantFilters): UnifiedPlant[] {
    let filtered = [...this.plants];

    // Filter by light level
    if (filters?.light) {
      filtered = filtered.filter(plant => {
        const lightLevel = plant.care.light.level.toLowerCase();
        if (filters.light === 'low') {
          return lightLevel.includes('low');
        } else if (filters.light === 'medium') {
          return lightLevel.includes('medium');
        } else if (filters.light === 'high') {
          return lightLevel.includes('high');
        }
        return true;
      });
    }

    // Filter by watering/time commitment
    if (filters?.time) {
      filtered = filtered.filter(plant => {
        const wateringLevel = plant.care.watering.level.toLowerCase();
        if (filters.time === 'low') {
          return wateringLevel === 'minimum';
        } else if (filters.time === 'medium') {
          return wateringLevel === 'average';
        } else if (filters.time === 'high') {
          return wateringLevel === 'frequent';
        }
        return true;
      });
    }

    // Filter by experience level (based on difficulty)
    if (filters?.experience) {
      filtered = filtered.filter(plant => {
        if (filters.experience === 'beginner') {
          return plant.difficulty <= 2;
        } else if (filters.experience === 'intermediate') {
          return plant.difficulty >= 2 && plant.difficulty <= 4;
        } else if (filters.experience === 'expert') {
          return plant.difficulty >= 3;
        }
        return true;
      });
    }

    return filtered.map(p => this.mapToUnified(p));
  }

  public getPlantById(id: string): UnifiedPlant | null {
    const plantId = id.replace('local-', '');
    const plant = this.plants.find(p => p.id === plantId);
    return plant ? this.mapToUnified(plant) : null;
  }

  public getAllPlants(): UnifiedPlant[] {
    return this.plants.map(p => this.mapToUnified(p));
  }
}

// Helper to generate numeric ID from string
declare global {
  interface String {
    hashCode(): number;
  }
}

String.prototype.hashCode = function() {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const localPlantDataService = new LocalPlantDataService();
