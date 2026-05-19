export interface GymSession {
  id: string;
  name: string;
  time: string;
  price: number;
}

export interface GymMerch {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface Gym {
  id: string;
  name: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  image: string;
  category: "General" | "Crossfit" | "Yoga" | "Bodybuilding";
  rating: number;
  sessions: GymSession[];
  merch: GymMerch[];
}

export const GYMS: Gym[] = [
  {
    id: "1",
    name: "Machakos Fitness Hub",
    description: "The premier fitness destination in Machakos Town, featuring state-of-the-art equipment and professional trainers.",
    location: "Machakos Town, Near Peoples Park",
    coordinates: { lat: -1.5177, lng: 37.2634 },
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ab1a5981-906f-42c3-b33c-1c1321856c38/machakos-gym-hero-a1022072-1779179187658.webp",
    category: "General",
    rating: 4.8,
    sessions: [
      { id: "s1", name: "Morning Cardio", time: "06:00 AM", price: 500 },
      { id: "s2", name: "Heavy Lifting", time: "05:00 PM", price: 700 },
    ],
    merch: [
      { id: "m1", name: "MFH Tech Tee", price: 1500, image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ab1a5981-906f-42c3-b33c-1c1321856c38/gym-tshirt-052b7060-1779179187563.webp", description: "Breathable performance fabric." },
    ]
  },
  {
    id: "2",
    name: "Kyumbi Crossfit",
    description: "High-intensity functional training for those who want to push their limits in the Kyumbi area.",
    location: "Kyumbi Junction, Machakos",
    coordinates: { lat: -1.5300, lng: 37.1500 },
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ab1a5981-906f-42c3-b33c-1c1321856c38/crossfit-gym-39e16572-1779179186774.webp",
    category: "Crossfit",
    rating: 4.9,
    sessions: [
      { id: "s3", name: "WOD Basics", time: "07:00 AM", price: 1000 },
      { id: "s4", name: "Advanced Crossfit", time: "06:00 PM", price: 1200 },
    ],
    merch: [
      { id: "m2", name: "Kyumbi Shaker", price: 800, image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ab1a5981-906f-42c3-b33c-1c1321856c38/gym-shaker-b2853134-1779179187174.webp", description: "BPA-free leak-proof shaker." },
    ]
  },
  {
    id: "3",
    name: "Mavoko Yoga Studio",
    description: "Find your inner peace and flexibility at Mavoko's most serene yoga destination.",
    location: "Mavoko, Machakos County",
    coordinates: { lat: -1.4500, lng: 37.0000 },
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ab1a5981-906f-42c3-b33c-1c1321856c38/yoga-studio-9410c81e-1779179187658.webp",
    category: "Yoga",
    rating: 4.7,
    sessions: [
      { id: "s5", name: "Hatha Yoga", time: "08:00 AM", price: 800 },
      { id: "s6", name: "Vinyasa Flow", time: "05:30 PM", price: 1000 },
    ],
    merch: [
      { id: "m3", name: "Zen Bottle", price: 1200, image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ab1a5981-906f-42c3-b33c-1c1321856c38/gym-bottle-06b4a6aa-1779179187693.webp", description: "Insulated water bottle." },
    ]
  },
  {
    id: "4",
    name: "Machakos Town Gym",
    description: "Affordable and community-focused fitness center in the heart of Machakos Town.",
    location: "Town Center, Machakos",
    coordinates: { lat: -1.5190, lng: 37.2650 },
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/ab1a5981-906f-42c3-b33c-1c1321856c38/community-gym-session-39c6593e-1779179186770.webp",
    category: "Bodybuilding",
    rating: 4.5,
    sessions: [
      { id: "s7", name: "Weight Training", time: "04:00 PM", price: 400 },
      { id: "s8", name: "Core Blast", time: "06:30 PM", price: 300 },
    ],
    merch: []
  }
];

export const ALL_MERCH = GYMS.flatMap(gym => gym.merch.map(m => ({ ...m, gymName: gym.name })));