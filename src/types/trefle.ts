// Trefle API Type Definitions

export interface TrefleImage {
  id: number;
  image_url: string;
  copyright: string;
}

export interface TrefleImageSet {
  flower?: TrefleImage[];
  leaf?: TrefleImage[];
  habit?: TrefleImage[];
  fruit?: TrefleImage[];
  bark?: TrefleImage[];
  other?: TrefleImage[];
}

export interface TreflePlant {
  id: number;
  common_name: string | null;
  slug: string;
  scientific_name: string;
  year: number;
  bibliography: string;
  author: string;
  status: string;
  rank: string;
  family_common_name: string | null;
  genus_id: number;
  image_url: string | null;
  synonyms: string[];
  genus: string;
  family: string;
  links: {
    self: string;
    plant: string;
    genus: string;
  };
}

export interface TrefleGrowth {
  description: string | null;
  sowing: string | null;
  days_to_harvest: number | null;
  row_spacing: {
    cm: number | null;
  };
  spread: {
    cm: number | null;
  };
  ph_maximum: number | null;
  ph_minimum: number | null;
  light: number | null; // 0-10 scale
  atmospheric_humidity: number | null; // 0-10 scale
  minimum_precipitation: {
    mm: number | null;
  };
  maximum_precipitation: {
    mm: number | null;
  };
  minimum_root_depth: {
    cm: number | null;
  };
  minimum_temperature: {
    deg_f: number | null;
    deg_c: number | null;
  };
  maximum_temperature: {
    deg_f: number | null;
    deg_c: number | null;
  };
  soil_nutriments: number | null; // 0-10 scale
  soil_salinity: number | null; // 0-10 scale
  soil_texture: number | null; // 0-10 scale
  soil_humidity: number | null; // 0-10 scale
}

export interface TrefleSpecifications {
  ligneous_type: string | null;
  growth_form: string | null;
  growth_habit: string | null;
  growth_rate: string | null;
  average_height: {
    cm: number | null;
  };
  maximum_height: {
    cm: number | null;
  };
  nitrogen_fixation: string | null;
  shape_and_orientation: string | null;
  toxicity: string | null;
}

export interface TreflePlantDetails {
  data: {
    id: number;
    common_name: string | null;
    slug: string;
    scientific_name: string;
    year: number;
    bibliography: string;
    author: string;
    status: string;
    rank: string;
    family_common_name: string | null;
    genus_id: number;
    observations: string | null;
    vegetable: boolean;
    image_url: string | null;
    images: TrefleImageSet;
    synonyms: string[];
    genus: string;
    family: string;
    duration: string[] | null; // annual, perennial, biennial
    edible_part: string[] | null;
    edible: boolean;
    flower: {
      color: string[] | null;
      conspicuous: boolean;
    };
    foliage: {
      texture: string | null;
      color: string[] | null;
      leaf_retention: boolean;
    };
    fruit_or_seed: {
      conspicuous: boolean;
      color: string[] | null;
      shape: string | null;
      seed_persistence: boolean;
    };
    specifications: TrefleSpecifications;
    growth: TrefleGrowth;
    distributions: {
      native: string[];
      introduced: string[];
    };
    sources: Array<{
      id: string;
      name: string;
      url: string;
      citation: string;
      last_update: string;
    }>;
  };
}

export interface TrefleApiResponse<T> {
  data: T[];
  links: {
    self: string;
    first: string;
    last: string;
    next?: string;
  };
  meta: {
    total: number;
  };
}

// Unified plant type that combines both APIs
export interface UnifiedPlant {
  id: string; // composite: source + original id
  sourceApi: 'perenual' | 'trefle';
  originalId: number;

  // Common fields
  commonName: string;
  scientificName: string | string[];
  imageUrl: string | null;
  images?: TrefleImageSet; // Rich images from Trefle

  // Care information
  watering?: string;
  sunlight?: string[];
  lightLevel?: number; // 0-10 from Trefle

  // Additional info
  cycle?: string;
  duration?: string[]; // From Trefle
  edible?: boolean;
  ediblePart?: string[];
  careLevel?: string;
  description?: string;

  // Botanical info (primarily from Trefle)
  family?: string;
  genus?: string;
  author?: string;

  // Growth specifications
  growthRate?: string;
  averageHeight?: { cm: number | null };
  toxicity?: string;

  // Environmental requirements
  phRange?: { min: number | null; max: number | null };
  temperatureRange?: {
    min: { degC: number | null; degF: number | null };
    max: { degC: number | null; degF: number | null };
  };

  // Original data for reference
  rawData?: any;
}
