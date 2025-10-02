// src/data/products.ts

import type { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: "Luxe Rose Tote",
    price: 299,
    originalPrice: 399,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
    ],
    category: "Tote Bags",
    description:
      "Elegant rose-colored tote bag crafted from premium Italian leather with gold-tone hardware.",
    rating: 4.8,
    reviews: 245,
    inStock: true,
    tags: ["Bestseller", "Premium", "New Arrival"],
    colors: ["Rose", "Blush", "Nude"],
    material: "Italian Leather",
    dimensions: '14" x 12" x 5"',
  },
  {
    id: "2",
    name: "Pearl Clutch Evening Bag",
    price: 199,
    originalPrice: 299,
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    ],
    category: "Clutches",
    description:
      "Stunning pearl-embellished clutch perfect for elegant evenings and special occasions.",
    rating: 4.9,
    reviews: 189,
    inStock: true,
    tags: ["Limited Edition", "Luxury"],
    colors: ["Pearl White", "Champagne"],
    material: "Satin with Pearl Embellishments",
    dimensions: '8" x 4" x 2"',
  },
  {
    id: "3",
    name: "Bloom Crossbody",
    price: 179,
    images: [
      "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800",
    ],
    category: "Crossbody",
    description:
      "Floral-inspired crossbody bag with adjustable chain strap and magnetic closure.",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    tags: ["Trending", "Versatile"],
    colors: ["Pink Bloom", "Lavender", "Coral"],
    material: "Vegan Leather",
    dimensions: '9" x 6" x 3"',
  },
  {
    id: "4",
    name: "Executive Satchel",
    price: 449,
    originalPrice: 599,
    images: [
      "https://images.unsplash.com/photo-1548637724-2b28dc196569?w=800",
      "https://images.unsplash.com/photo-1585488802494-8b9050f5bd87?w=800",
    ],
    category: "Satchels",
    description:
      "Professional satchel bag with laptop compartment and organizational pockets.",
    rating: 4.6,
    reviews: 98,
    inStock: true,
    tags: ["Professional", "Spacious"],
    colors: ["Black", "Navy", "Burgundy"],
    material: "Full-Grain Leather",
    dimensions: '16" x 12" x 4"',
  },
  {
    id: "5",
    name: "Sunset Beach Tote",
    price: 129,
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800",
      "https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800",
    ],
    category: "Tote Bags",
    description:
      "Spacious canvas tote with leather trim, perfect for beach days and weekend getaways.",
    rating: 4.5,
    reviews: 267,
    inStock: true,
    tags: ["Summer Essential", "Eco-Friendly"],
    colors: ["Natural", "Sand", "Ocean Blue"],
    material: "Canvas & Leather",
    dimensions: '18" x 14" x 6"',
  },
  {
    id: "6",
    name: "Crystal Mini Backpack",
    price: 219,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800",
    ],
    category: "Backpacks",
    description:
      "Compact designer backpack with crystal embellishments and convertible straps.",
    rating: 4.8,
    reviews: 143,
    inStock: true,
    tags: ["Trendy", "Convertible"],
    colors: ["Crystal Pink", "Silver", "Gold"],
    material: "Metallic Leather",
    dimensions: '10" x 8" x 4"',
  },
];
