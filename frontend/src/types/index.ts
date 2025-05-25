// types/index.ts
export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Sample {
  id: number;
  title: string;
  provider: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface CustomProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  priceRange: string;
  deliveryTime: string;
  imageUrl: string;
  examples: string[];
}

export interface Merchant {
  id: number;
  name: string;
  description: string;
  categories: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  minOrder: string;
  imageUrl: string;
  featured?: boolean;
}