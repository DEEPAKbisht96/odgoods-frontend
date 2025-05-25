// data/sampleProducts.ts
import { CustomProduct } from '@/types';

export const sampleProducts: CustomProduct[] = [
  {
    id: 1,
    title: 'Personalized 3D Printed Figurine',
    description: 'Get a custom 3D printed figurine of yourself, your pet, or any character',
    category: '3d-printed',
    priceRange: '$30-$150',
    deliveryTime: '5-10 days',
    imageUrl: '/images/figurine.jpg',
    examples: [
      'Action figure of yourself',
      'Pet replica',
      'Custom D&D miniature'
    ]
  },
  {
    id: 2,
    title: 'Engraved Jewelry',
    description: 'Custom jewelry with personalized engravings',
    category: 'custom-gifts',
    priceRange: '$50-$300',
    deliveryTime: '7-14 days',
    imageUrl: '/images/jewelery.jpg',
    examples: [
      'Name necklaces',
      'Date rings',
      'Custom message bracelets'
    ]
  },
  {
    id: 3,
    title: 'Custom PC Build',
    description: 'Tailor-made computer system to your exact specifications',
    category: 'electronics',
    priceRange: '$500-$5000',
    deliveryTime: '10-15 days',
    imageUrl: '/images/custom_pc.jpg',
    examples: [
      'Gaming rig',
      'Workstation PC',
      'Home theater computer'
    ]
  },
  {
    id: 4,
    title: 'Hand-painted Portrait',
    description: 'Custom portrait painting from your photo',
    category: 'art-decor',
    priceRange: '$100-$1000',
    deliveryTime: '14-21 days',
    imageUrl: '/images/painting.png',
    examples: [
      'Family portrait',
      'Pet portrait',
      'Landscape from your photo'
    ]
  },
  {
    id: 5,
    title: 'Custom Wooden Furniture',
    description: 'Handcrafted furniture made to your specifications',
    category: 'furniture',
    priceRange: '$200-$2000',
    deliveryTime: '15-30 days',
    imageUrl: '/images/furniture.png',
    examples: [
      'Custom dining table',
      'Bookshelf to fit your space',
      'Personalized desk'
    ]
  },
  {
    id: 6,
    title: 'Bespoke Leather Goods',
    description: 'Handmade leather items customized for you',
    category: 'accessories',
    priceRange: '$80-$500',
    deliveryTime: '10-20 days',
    imageUrl: '/images/leather.jpeg',
    examples: [
      'Custom wallet',
      'Personalized journal cover',
      'Made-to-order bag'
    ]
  },
];