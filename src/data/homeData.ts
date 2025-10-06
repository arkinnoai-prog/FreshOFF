// data/homeData.ts
import bag11 from "../assets/bags/bag111.png";
import bag22 from "../assets/bags/bag222.png";
import bag33 from "../assets/bags/bag333.png";
import bag44 from "../assets/bags/bag444.png";
import bag55 from "../assets/bags/bag555.png";
import bag1second from "../assets/bags/bag1second.png";
import bag1third from "../assets/bags/bag1third.png";
import bag2second from "../assets/bags/bag2second.png";
import bag2third from "../assets/bags/bag2third.png";
import bag3second from "../assets/bags/bag3second.png";
import bag3third from "../assets/bags/bag3third.png";
import bag4second from "../assets/bags/bag4second.png";
import bag4third from "../assets/bags/bag4third.png";
import bag5second from "../assets/bags/bag5second.png";
import bag5third from "../assets/bags/bag5third.png";
import c1 from "../assets/bags/categories/c1.png";
import c2 from "../assets/bags/categories/c2.png";
import c3 from "../assets/bags/categories/c3.png";
import c4 from "../assets/bags/categories/c4.png";

import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiAward,
  FiStar,
  FiGlobe,
} from "react-icons/fi";

export interface Bag {
  id: number;
  name: string;
  title: string;
  image: string;
  bgColor: string;
  primaryColor: string;
  price?: string;
  rating?: number;
  features?: string[];
  description?: string;
  additionalImages?: string[];
}

export const bags: Bag[] = [
  {
    id: 1,
    name: "Chanel White Quilted Calfskin",
    title: "Gold Hardware, 2024",
    image: bag11,
    bgColor: "from-purple-900 to-pink-600",
    primaryColor: "#3E5213",
    price: "$129.99",
    rating: 4.8,
    features: ["Water Resistant", "Laptop Compartment", "USB Charging Port"],
    description: `
The interior is lined in a tonal leather.  
Includes dust bag.  
This item is final sale and not eligible for return.  

**Condition Report:**  
Revive | Fair | Good | Very Good | Like New  
Faint press marks throughout the exterior.  

**Year:** 2015  

**Dimensions:**  
Height: 6.42 inches / 16.3 cm  
Width: 8.39 inches / 21.3 cm  
Depth: 2.48 inches / 6.3 cm  
Shoulder Strap Drop Max: 2.95 inches / 7.5 cm  
Shoulder Strap Drop Min: 18.7 inches / 47.5 cm  

**SKU:** DCVKX
`,
    additionalImages: [bag11, bag1second, bag1third],
  },
  {
    id: 2,
    name: "Hermès White Matte Niloticus",
    title: "Palladium Hardware, 2022",
    image: bag22,
    bgColor: "from-blue-900 to-purple-600",
    primaryColor: "#03050C",
    price: "$299.99",
    rating: 4.9,
    features: ["Genuine Leather", "Gold Hardware", "Dust Bag Included"],
    description: `
The interior is lined in a Gris Cendré chèvre leather.  
Includes clochette, lock, keys, felt, care booklet, raincoat, dust bag and box.  
This item is final sale and not eligible for return.  

**Condition Report:**  
Revive | Fair | Good | Very Good | Like New  
Minor scratching and surface wear to hardware. Partial plastic and minor scratching to hardware feet. Natural markings throughout the exotic skin exterior.  

**Year:** 2022  

**Dimensions:**  
Height: 8.66 inches / 22 cm  
Width: 11.81 inches / 30 cm  
Depth: 6.3 inches / 16 cm  
Handle Drop: 3.74 inches / 9.5 cm  

**SKU:** DFG7M
`,
    additionalImages: [bag22, bag2second, bag2third],
  },
  {
    id: 3,
    name: "Hermès Gold Togo Birkin 25",
    title: "Gold Hardware, 2025",
    image: bag33,
    bgColor: "from-indigo-900 to-pink-600",
    primaryColor: "#002A31",
    price: "$189.99",
    rating: 4.7,
    features: ["Expandable", "Shoe Compartment", "TSA Approved"],
    description: `
The interior is lined with tonal Chèvre leather.  
Includes clochette, lock, keys, felt, care booklet, dust bag and box.  
This item is final sale and not eligible for return.  

**Condition Report:**  
Revive | Fair | Good | Very Good |  New  
No visible signs of wear. Plastic intact.  

**Year:** 2025  

**Dimensions:**  
Height: 7.87 inches / 20 cm  
Width: 9.84 inches / 25 cm  
Depth: 5.12 inches / 13 cm  
Handle Drop: 2.5 inches / 6.35 cm  

**SKU:** DD3K3
`,
    additionalImages: [bag33, bag3second, bag3third],
  },
  {
    id: 4,
    name: "Hermès White Matte Niloticus New Model",
    title: "Palladium Hardware, 2022",
    image: bag44,
    bgColor: "from-red-900 to-purple-600",
    primaryColor: "#130F1E",
    price: "$249.99",
    rating: 4.9,
    features: ["RFID Protection", "Organizer Pockets", "Shoulder Strap"],
    description: `
The interior is lined in a Gris Cendré chèvre leather.  
Includes clochette, lock, keys, felt, care booklet, raincoat, dust bag and box.  
This item is final sale and not eligible for return.  

**Condition Report:**  
Revive | Fair | Good | Very Good | Like New  
Minor scratching and surface wear to hardware. Partial plastic and minor scratching to hardware feet. Natural markings throughout the exotic skin exterior.  

**Year:** 2022  

**Dimensions:**  
Height: 8.66 inches / 22 cm  
Width: 11.81 inches / 30 cm  
Depth: 6.3 inches / 16 cm  
Handle Drop: 3.74 inches / 9.5 cm  

**SKU:** DFG7M
`,
    additionalImages: [bag44, bag4second, bag4third],
  },
  {
    id: 5,
    name: "Hermès White Matte Niloticus green  30",
    title: "Palladium Hardware, 2022 (Color Variant)",
    image: bag55,
    bgColor: "from-purple-800 to-pink-700",
    primaryColor: "#001D1A",
    price: "$79.99",
    rating: 4.6,
    features: ["Eco-Friendly", "Machine Washable", "Reinforced Handles"],
    description: `
The interior is lined in a Gris Cendré chèvre leather.  
Includes clochette, lock, keys, felt, care booklet, raincoat, dust bag and box.  
This item is final sale and not eligible for return.  

**Condition Report:**  
Revive | Fair | Good | Very Good | Like New  
Minor scratching and surface wear to hardware. Partial plastic and minor scratching to hardware feet. Natural markings throughout the exotic skin exterior.  

**Year:** 2022  

**Dimensions:**  
Height: 8.66 inches / 22 cm  
Width: 11.81 inches / 30 cm  
Depth: 6.3 inches / 16 cm  
Handle Drop: 3.74 inches / 9.5 cm  

**SKU:** DFG7M
`,
    additionalImages: [bag55, bag5second, bag5third],
  },
];

export const heroSlides = [
  {
    title: "LUXURY REIMAGINED",
    titleImage: "/src/assets/hero/text/1.png", // Add image path
    subtitle: "Elite Collection 2024",
    description: "Where elegance meets innovation",
  },
];
export const features = [
  {
    icon: FiTruck,
    title: "EXPRESS DELIVERY",
    desc: "Free shipping worldwide",
  },
  {
    icon: FiShield,
    title: "SECURE PAYMENT",
    desc: "256-bit SSL encryption",
  },
  {
    icon: FiRefreshCw,
    title: "EASY RETURNS",
    desc: "30-day money back",
  },
  {
    icon: FiAward,
    title: "PREMIUM QUALITY",
    desc: "Handcrafted excellence",
  },
];

export const categories = [
  {
    name: "LUXURY TOTES",
    image: c1,
    count: 45,
  },
  {
    name: "EVENING CLUTCHES",
    image: c2,
    count: 32,
  },
  {
    name: "DESIGNER BAGS",
    image: c3,
    count: 28,
  },
  {
    name: "TRAVEL COLLECTION",
    image: c4,
    count: 19,
  },
];

export const stats = [
  { value: "50K+", label: "Happy Customers", icon: FiStar },
  { value: "100+", label: "Premium Designs", icon: FiAward },
  { value: "15+", label: "Years Experience", icon: FiGlobe },
  { value: "98%", label: "Satisfaction Rate", icon: FiShield },
];
