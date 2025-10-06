import type { Product } from "../types";
import black1 from "../assets/bags/featured-products/black1.png";
import black2 from "../assets/bags/featured-products/black2.png";

import blue1 from "../assets/bags/featured-products/blue1.png";
import blue2 from "../assets/bags/featured-products/blue2.png";

import orange1 from "../assets/bags/featured-products/orange1.png";
import orange2 from "../assets/bags/featured-products/orange2.png";

import rose from "../assets/bags/featured-products/rose1.png";
import rose2 from "../assets/bags/featured-products/rose2.png";

import white1 from "../assets/bags/featured-products/white1.png";
import white2 from "../assets/bags/featured-products/white2.png";

import green1 from "../assets/bags/featured-products/green1.png";
import green2 from "../assets/bags/featured-products/green2.png";
export const products: Product[] = [
  {
    id: "1",
    name: "Luxe Rose Tote",
    price: 299,
    originalPrice: 399,
    images: [rose2, rose],
    category: "Tote Bags",
    description:
      "Elegant rose-colored tote bag crafted from premium Italian leather with gold-tone hardware.",
    rating: 4.8,
    stock: 10,
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
    images: [green1, green2],
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
      blue1,
      blue2
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
      black1,
      black2
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
      orange2,
      orange1
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
      white1,
      white2
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
