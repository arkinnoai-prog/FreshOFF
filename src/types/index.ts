// src/types/index.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  colors?: string[];
  material?: string;
  dimensions?: string;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}
