// data/services.ts
import { Service } from '@/types';
import {
  HomeIcon,
  WrenchIcon,
  ScissorsIcon,
  CakeIcon,
  AcademicCapIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/outline';

export const services: Service[] = [
  {
    id: 1,
    name: 'Home Cleaning',
    slug: 'home-cleaning',
    description: 'Professional cleaning services for your home or office.',
    icon: HomeIcon,
  },
  {
    id: 2,
    name: 'Repairs',
    slug: 'repairs',
    description: 'Skilled technicians for all your repair needs.',
    icon: WrenchIcon,
  },
  {
    id: 3,
    name: 'Beauty Services',
    slug: 'beauty-services',
    description: 'Hair, nails, and beauty treatments at your convenience.',
    icon: ScissorsIcon,
  },
  {
    id: 4,
    name: 'Catering',
    slug: 'catering',
    description: 'Delicious food for your events and gatherings.',
    icon: CakeIcon,
  },
  {
    id: 5,
    name: 'Tutoring',
    slug: 'tutoring',
    description: 'Expert tutors for all subjects and levels.',
    icon: AcademicCapIcon,
  },
  {
    id: 6,
    name: 'Music Lessons',
    slug: 'music-lessons',
    description: 'Learn to play your favorite instrument.',
    icon: MusicalNoteIcon,
  },
];