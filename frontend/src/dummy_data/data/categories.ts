// data/categories.ts
import { ProductCategory } from '@/types';
import {
  CubeIcon,
  GiftIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  PaintBrushIcon,
  CakeIcon,
} from '@heroicons/react/24/outline';

export const categories: ProductCategory[] = [
  {
    id: 1,
    name: '3D Printed Items',
    slug: '3d-printed',
    description: 'Custom 3D printed objects to your specifications',
    icon: CubeIcon,
  },
  {
    id: 2,
    name: 'Custom Gifts',
    slug: 'custom-gifts',
    description: 'Personalized gifts for any occasion',
    icon: GiftIcon,
  },
  {
    id: 3,
    name: 'Electronics',
    slug: 'electronics',
    description: 'Custom electronics and computer builds',
    icon: ComputerDesktopIcon,
  },
  {
    id: 4,
    name: 'Phone Accessories',
    slug: 'phone-accessories',
    description: 'Custom cases, stands, and more',
    icon: DevicePhoneMobileIcon,
  },
  {
    id: 5,
    name: 'Art & Decor',
    slug: 'art-decor',
    description: 'Custom paintings, sculptures, and home decor',
    icon: PaintBrushIcon,
  },
  {
    id: 6,
    name: 'Custom Food Items',
    slug: 'custom-food',
    description: 'Specialty cakes, chocolates, and edible creations',
    icon: CakeIcon,
  },
];