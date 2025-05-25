// data/merchants.ts
import { Merchant } from '@/types';

export const merchants: Merchant[] = [
  {
    id: 1,
    name: 'Custom Crafts Co.',
    description: 'Specializing in handmade custom furniture and home decor',
    categories: ['furniture', 'home-decor'],
    rating: 4.8,
    reviewCount: 124,
    deliveryTime: '10-15 days',
    minOrder: '$100',
    imageUrl: '/images/furniture_comp.png',
    featured: true
  },
  {
    id: 2,
    name: '3D Print Masters',
    description: 'High-quality 3D printed items with quick turnaround',
    categories: ['3d-printing', 'gifts'],
    rating: 4.6,
    reviewCount: 89,
    deliveryTime: '5-10 days',
    minOrder: '$30',
    imageUrl: '/images/3d_comp.png'
  },
  {
    id: 3,
    name: 'Bespoke Electronics',
    description: 'Custom PC builds and electronic gadgets',
    categories: ['electronics', 'computers'],
    rating: 4.9,
    reviewCount: 215,
    deliveryTime: '7-14 days',
    minOrder: '$200',
    imageUrl: '/images/electronics.png',
    featured: true
  },
  {
    id: 4,
    name: 'Personalized Jewelry',
    description: 'Handcrafted custom jewelry with engraving',
    categories: ['jewelry', 'gifts'],
    rating: 4.7,
    reviewCount: 156,
    deliveryTime: '7-21 days',
    minOrder: '$50',
    imageUrl: '/images/jewelery.jpg'
  },
  {
    id: 5,
    name: 'Artisan Leatherworks',
    description: 'Custom leather goods made to order',
    categories: ['accessories', 'fashion'],
    rating: 4.5,
    reviewCount: 72,
    deliveryTime: '14-21 days',
    minOrder: '$80',
    imageUrl: '/images/leather.jpeg'
  },
  {
    id: 6,
    name: 'The Cake Artist',
    description: 'Custom designed cakes for all occasions',
    categories: ['food', 'events'],
    rating: 4.8,
    reviewCount: 183,
    deliveryTime: '5-7 days',
    minOrder: '$75',
    imageUrl: '/images/cake.png',
    featured: true
  },
];