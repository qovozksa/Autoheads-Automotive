
export interface CarModel {
  id: string;
  name: string;
  category: string;
  tagline: string;
  specs: string;
  price: string;
  image: string;
  details: {
    hp: string;
    topSpeed: string;
    acceleration: string;
    engine: string;
  };
  type: 'NEW ARRIVAL' | 'LIMITED EDITION' | 'CERTIFIED PRE-OWNED';
  showInHero: boolean;
  showInInventory: boolean;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  verified: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}
