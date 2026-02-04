
import { CarModel, Review } from './types';

export const INITIAL_CARS: CarModel[] = [
  {
    id: 'phantom-gt',
    name: 'Phantom GT',
    category: 'ELECTRIC PERFORMANCE',
    tagline: 'The silent predator of the open road.',
    specs: '0-60 in 2.1s • 1020 HP • Dual Motor AWD',
    price: '$185,000',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1920',
    details: {
      hp: '1020 HP',
      topSpeed: '200 mph',
      acceleration: '2.1s (0-60)',
      engine: 'Dual-Motor Electric'
    },
    type: 'LIMITED EDITION',
    showInHero: true,
    showInInventory: true
  },
  {
    id: 'stellar-s',
    name: 'Stellar S',
    category: 'LUXURY SEDAN',
    tagline: 'Artisan comfort meets uncompromising power.',
    specs: '0-60 in 3.4s • 650 HP • V8 Biturbo',
    price: '$142,000',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920',
    details: {
      hp: '650 HP',
      topSpeed: '185 mph',
      acceleration: '3.4s (0-60)',
      engine: '4.0L V8 Biturbo'
    },
    type: 'NEW ARRIVAL',
    showInHero: true,
    showInInventory: true
  },
  {
    id: 'vortex-r',
    name: 'Vortex R',
    category: 'TRACK WEAPON',
    tagline: 'Designed on the grid, refined for the street.',
    specs: '0-60 in 2.8s • 800 HP • Lightweight Carbon',
    price: '$210,000',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1920',
    details: {
      hp: '800 HP',
      topSpeed: '215 mph',
      acceleration: '2.8s (0-60)',
      engine: '5.2L V10 Naturally Aspirated'
    },
    type: 'CERTIFIED PRE-OWNED',
    showInHero: true,
    showInInventory: true
  },
  {
    id: 'onyx-e',
    name: 'Onyx E',
    category: 'ELECTRIC SUV',
    tagline: 'Space, redefined by silence.',
    specs: '0-60 in 4.2s • 500 HP • Long Range',
    price: '$95,000',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200',
    details: {
      hp: '500 HP',
      topSpeed: '135 mph',
      acceleration: '4.2s (0-60)',
      engine: 'All-Electric AWD'
    },
    type: 'NEW ARRIVAL',
    showInHero: false,
    showInInventory: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    name: "Alexander Vance",
    role: "Collector",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    comment: "The Phantom GT is not just a car; it's a statement of future heritage. The delivery experience was unparalleled.",
    verified: true
  },
  {
    id: '2',
    name: "Elena Sterling",
    role: "Architect",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    comment: "Precision engineering at its finest. The interior craftsmanship in the Stellar S rivals the best high-end furniture.",
    verified: true
  }
];
