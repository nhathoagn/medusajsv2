import { MaterialValueStatus } from "./common";

export interface CreateComponentInput {
  name: string;
  materials: string[];
  image: string;
  norm: number;
  ui: string;
  isSelfSufficient: boolean;
  isExtraModel: boolean;
  default_value: Record<string, any>;
  metadata: Record<string, any>;
}
export interface Material {
  name: string;
  handle: string;
  description: string;
  material_value: MaterialValue[];
  rank: number;
  metadata: Record<string, any>;
}

export interface MaterialValue {
  name: string;
  value: string;
  image: string;
  description: string;
  rank: number;
  metadata: Record<string, any>;
  price: number;
  cost: number;
  status: MaterialValueStatus;
}

export interface Component {
  id: string;
  name: string;
  materials: Material[];
  image: string;
  norm: number;
  ui: string;
  isSelfSufficient: boolean;
  isExtraModel: boolean;
  default_value: Record<string, any>;
  metadata: Record<string, any>;
}

export interface ThreeDimensional {
  id: string;
  title?: string;
  url?: string;
  product_id?: string;
  components?: Component[];
  isFlip: boolean;
  isBranding: boolean;
  isPhysical: boolean;
  metadata?: Record<string, any>;
}
