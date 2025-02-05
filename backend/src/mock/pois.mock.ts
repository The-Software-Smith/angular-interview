import { POI } from '../interfaces/poi.interface';

// Helper function to generate random coordinates within New York City area
function randomCoordinate(base: number, range: number): number {
  return base + (Math.random() - 0.5) * range;
}

// Categories with sample names and descriptions
const categories = {
  restaurant: {
    names: [
      'Italian Kitchen',
      'Sushi Bar',
      'Steakhouse',
      'Café',
      'Bistro',
      'Pizzeria',
      'Diner',
      'Taco Shop',
    ],
    descriptions: [
      'Family-owned eatery',
      'Popular local restaurant',
      'Fine dining establishment',
      'Casual dining spot',
    ],
  },
  park: {
    names: [
      'Community Park',
      'Gardens',
      'Square',
      'Playground',
      'Recreation Center',
    ],
    descriptions: [
      'Local green space',
      'Public recreation area',
      'Historic public park',
      'Community gathering space',
    ],
  },
  shopping: {
    names: ['Mall', 'Boutique', 'Market', 'Shopping Center', 'Outlet'],
    descriptions: [
      'Retail destination',
      'Shopping complex',
      'Local marketplace',
      'Shopping district',
    ],
  },
  cultural: {
    names: ['Gallery', 'Theater', 'Museum', 'Arts Center', 'Cultural Center'],
    descriptions: [
      'Cultural venue',
      'Arts destination',
      'Historic institution',
      'Exhibition space',
    ],
  },
  entertainment: {
    names: ['Cinema', 'Comedy Club', 'Music Venue', 'Sports Center', 'Arcade'],
    descriptions: [
      'Entertainment venue',
      'Popular attraction',
      'Local hotspot',
      'Recreation facility',
    ],
  },
};

// Generate large number of POIs
const generatePOIs = (startId: number, count: number): POI[] => {
  const pois: POI[] = [];
  const categoryTypes = Object.keys(categories);

  for (let i = 0; i < count; i++) {
    const category =
      categoryTypes[Math.floor(Math.random() * categoryTypes.length)];
    const categoryData = categories[category as keyof typeof categories];
    const namePrefix =
      categoryData.names[Math.floor(Math.random() * categoryData.names.length)];
    const descriptionPrefix =
      categoryData.descriptions[
        Math.floor(Math.random() * categoryData.descriptions.length)
      ];

    pois.push({
      id: startId + i,
      name: `${namePrefix} ${Math.floor(Math.random() * 100)}`,
      latitude: randomCoordinate(40.7128, 0.3), // Centered around NYC
      longitude: randomCoordinate(-74.006, 0.3),
      category: category,
      description: `${descriptionPrefix} in New York City`,
    });
  }
  return pois;
};

// Combine existing POIs with generated ones
export const POIS: POI[] = [
  {
    id: 1,
    name: 'Central Park',
    latitude: 40.7829,
    longitude: -73.9654,
    category: 'park',
    description: 'Famous urban park in New York City',
  },
  {
    id: 2,
    name: 'Empire State Building',
    latitude: 40.7484,
    longitude: -73.9857,
    category: 'landmark',
    description: 'Iconic skyscraper',
  },
  {
    id: 3,
    name: 'Times Square',
    latitude: 40.758,
    longitude: -73.9855,
    category: 'attraction',
    description: 'Major commercial intersection',
  },
  {
    id: 4,
    name: 'Statue of Liberty',
    latitude: 40.6892,
    longitude: -74.0445,
    category: 'landmark',
    description: 'Historic monument and symbol of freedom',
  },
  {
    id: 5,
    name: 'Metropolitan Museum of Art',
    latitude: 40.7794,
    longitude: -73.9632,
    category: 'museum',
    description: 'World-renowned art museum on Museum Mile',
  },
  {
    id: 6,
    name: 'Brooklyn Bridge',
    latitude: 40.7061,
    longitude: -73.9969,
    category: 'landmark',
    description: 'Historic bridge connecting Manhattan and Brooklyn',
  },
  {
    id: 7,
    name: 'High Line',
    latitude: 40.748,
    longitude: -74.0048,
    category: 'park',
    description: 'Elevated linear park built on former railway',
  },
  {
    id: 8,
    name: 'Rockefeller Center',
    latitude: 40.7587,
    longitude: -73.9787,
    category: 'attraction',
    description: 'Historic complex known for shopping and ice skating',
  },
  {
    id: 9,
    name: 'Broadway Theatre District',
    latitude: 40.7589,
    longitude: -73.9851,
    category: 'entertainment',
    description: 'Home to famous theatrical performances',
  },
  {
    id: 10,
    name: 'Grand Central Terminal',
    latitude: 40.7527,
    longitude: -73.9772,
    category: 'transportation',
    description: 'Historic railway station with iconic architecture',
  },
  {
    id: 11,
    name: 'One World Trade Center',
    latitude: 40.7127,
    longitude: -74.0134,
    category: 'landmark',
    description: 'Tallest building in the Western Hemisphere',
  },
  {
    id: 12,
    name: 'Chelsea Market',
    latitude: 40.7425,
    longitude: -74.0045,
    category: 'food',
    description: 'Popular food hall and shopping complex',
  },
  {
    id: 13,
    name: 'Washington Square Park',
    latitude: 40.7308,
    longitude: -73.9973,
    category: 'park',
    description: 'Historic park in Greenwich Village',
  },
  {
    id: 14,
    name: 'Museum of Modern Art',
    latitude: 40.7614,
    longitude: -73.9776,
    category: 'museum',
    description: 'World-class modern art museum',
  },
  {
    id: 15,
    name: 'Chinatown',
    latitude: 40.7157,
    longitude: -73.9977,
    category: 'neighborhood',
    description: 'Vibrant neighborhood known for culture and cuisine',
  },
  ...generatePOIs(16, 1000),
];
