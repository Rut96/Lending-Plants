// Perenual API Type Definitions

import darkRoomImg from '../assets/images/dark-room.jpg';
import brightRoomImg from '../assets/images/bright-room.jpg';
import balconyImg from '../assets/images/balcony.jpg';
import waterRareImg from '../assets/images/water-rare.jpg';
import waterWeeklyImg from '../assets/images/water-weekly.jpg';
import waterHighImg from '../assets/images/water-high.jpg';

export interface PlantImage {
  license: number;
  license_name: string;
  license_url: string;
  original_url: string;
  regular_url: string;
  medium_url: string;
  small_url: string;
  thumbnail: string;
}

export interface PlantSpecies {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  cycle: string;
  watering: string;
  sunlight: string[];
  default_image?: PlantImage;
}

export interface PlantDetails extends PlantSpecies {
  type: string;
  dimension: string;
  care_level?: string;
  description?: string;
  watering_general_benchmark?: {
    value: string;
    unit: string;
  };
  sunlight_detail?: string;
  pruning_month?: string[];
  growth_rate?: string;
  maintenance?: string;
  poisonous_to_pets?: number;
  poisonous_to_humans?: number;
  flowers?: boolean;
  flowering_season?: string;
  color?: string;
  harvest_season?: string;
  leaf?: boolean;
  fruits?: boolean;
  edible_fruit?: boolean;
  indoor?: boolean;
  care_guides?: string;
  propagation?: string[];
}

export interface ApiResponse<T> {
  data: T[];
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
}

export interface PlantDetailsResponse {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  family: string | null;
  origin: string[];
  type: string;
  dimension: string;
  dimensions: {
    type: string | null;
    min_value: number | null;
    max_value: number | null;
    unit: string | null;
  };
  cycle: string;
  attracts: string[];
  propagation: string[];
  hardiness: {
    min: string;
    max: string;
  };
  hardiness_location: {
    full_url: string;
    full_iframe: string;
  };
  watering: string;
  depth_water_requirement: any[];
  volume_water_requirement: any[];
  watering_period: string | null;
  watering_general_benchmark: {
    value: string;
    unit: string;
  };
  plant_anatomy: any[];
  sunlight: string[];
  pruning_month: string[];
  pruning_count: any[];
  seeds: number;
  maintenance: string | null;
  care_level: string | null;
  growth_rate: string;
  soil: string[];
  drought_tolerant: boolean;
  salt_tolerant: boolean;
  thorny: boolean;
  invasive: boolean;
  tropical: boolean;
  indoor: boolean;
  care_guides: string;
  pest_susceptibility: any[];
  pest_susceptibility_api: string;
  flowers: boolean;
  flowering_season: string | null;
  flower_color: string;
  cones: boolean;
  fruits: boolean;
  edible_fruit: boolean;
  edible_fruit_taste_profile: string;
  fruit_nutritional_value: string;
  fruit_color: string[];
  harvest_season: string | null;
  leaf: boolean;
  leaf_color: string[];
  edible_leaf: boolean;
  cuisine: boolean;
  medicinal: boolean;
  poisonous_to_humans: number;
  poisonous_to_pets: number;
  description: string;
  default_image: PlantImage | null;
  other_images: string;
}

// Filter types
export type LightLevel = 'low' | 'medium' | 'high';
export type TimeCommitment = 'low' | 'medium' | 'high';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'expert';

export interface PlantFilters {
  light?: LightLevel;
  time?: TimeCommitment;
  experience?: ExperienceLevel;
}

// Filter display options
export interface FilterDisplayOption {
  value: string;
  label: string;
  description: string;
  emoji: string;
  image: string;
}

export const LIGHT_OPTIONS: FilterDisplayOption[] = [
  {
    value: 'low',
    label: 'Dark Room',
    description: 'Basement, bathroom, interior',
    emoji: '🏠',
    image: darkRoomImg,
  },
  {
    value: 'medium',
    label: 'Bright Room',
    description: 'Near windows, living room',
    emoji: '🪟',
    image: brightRoomImg,
  },
  {
    value: 'high',
    label: 'Sunny Spot',
    description: 'South-facing, balcony',
    emoji: '☀️',
    image: balconyImg,
  },
];

export const TIME_OPTIONS: FilterDisplayOption[] = [
  {
    value: 'low',
    label: 'Low Maintenance',
    description: 'Water rarely, easy care',
    emoji: '🌵',
    image: waterRareImg,
  },
  {
    value: 'medium',
    label: 'Moderate Care',
    description: 'Water weekly, some attention',
    emoji: '🪴',
    image: waterWeeklyImg,
  },
  {
    value: 'high',
    label: 'High Attention',
    description: 'Frequent watering, daily care',
    emoji: '💧',
    image: waterHighImg,
  },
];

export const EXPERIENCE_OPTIONS: FilterDisplayOption[] = [
  {
    value: 'beginner',
    label: 'Beginner',
    description: 'First-time plant parent',
    emoji: '🌱',
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    description: 'Some experience with plants',
    emoji: '🌿',
  },
  {
    value: 'expert',
    label: 'Expert',
    description: 'Experienced plant keeper',
    emoji: '🌳',
  },
];

// Mapping types
export type SunlightValue = 'full_shade' | 'part_shade' | 'sun-part_shade' | 'full_sun';
export type WateringValue = 'none' | 'minimum' | 'average' | 'frequent';

export interface FilterMappings {
  light: {
    low: SunlightValue[];
    medium: SunlightValue[];
    high: SunlightValue[];
  };
  time: {
    low: WateringValue[];
    medium: WateringValue[];
    high: WateringValue[];
  };
}
