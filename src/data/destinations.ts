import { Destination } from '../types';

export const destinationRecords: Destination[] = [
  {
    id: 1,
    location: 'Bali',
    type: 'activity',
    title: 'Beach Paradise',
    price: 299,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800',
    description: 'A stunning beachfront adventure with crystal blue waters and relaxing sunsets.',
    duration: '3 Days',
    highlights: ['Surf lessons', 'Sunset dinner', 'Turtle sanctuary visit'],
    includes: ['Equipment', 'Lunch', 'Guide'],
    itinerary: [
      { day: 1, title: 'Arrival & Surf', description: 'Arrive at Kuta Beach and start your first surf lesson.' },
      { day: 2, title: 'Snorkeling', description: 'Explore the vibrant coral reefs.' },
      { day: 3, title: 'Sunset Relax', description: 'Enjoy a beachside BBQ at sunset.' }
    ]
  },
  {
    id: 2,
    location: 'Bali',
    type: 'activity',
    title: 'Cultural Tour',
    price: 199,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800',
    description: 'Explore temples, markets, and local traditions in a guided cultural experience.',
    duration: '1 Day',
    highlights: ['Uluwatu Temple', 'Kecak Dance', 'Local market'],
    includes: ['Transport', 'Entry fees', 'Water']
  },
  {
    id: 3,
    location: 'Bali',
    type: 'package',
    title: 'Luxury Escape',
    price: 999,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800',
    description: 'A premium package with private villas, fine dining, and exclusive island experiences.',
    duration: '7 Days',
    highlights: ['Private villa', 'Infinity pool', 'Gourmet dining'],
    includes: ['Flights', 'All meals', 'Private guide']
  },
  {
    id: 4,
    location: 'Tokyo',
    type: 'activity',
    title: 'Food Tour',
    price: 149,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800',
    description: 'Taste authentic Japanese cuisine while discovering Tokyo’s hidden culinary gems.',
    duration: '4 Hours',
    highlights: ['Sushi tasting', 'Ramen gems', 'Street food'],
    includes: ['Food samples', 'Drink', 'Map']
  },
  {
    id: 5,
    location: 'Tokyo',
    type: 'package',
    title: 'Premium Tokyo',
    price: 1299,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800',
    description: 'A luxury itinerary with VIP experiences across Tokyo’s most iconic neighborhoods.',
    duration: '5 Days',
    highlights: ['Skytree VIP', 'Shibuya crossing', 'Temples'],
    includes: ['5-star hotel', 'Transport', 'English guide']
  },
  {
    id: 6,
    location: 'Paris',
    type: 'activity',
    title: 'Eiffel Tower Tour',
    price: 99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1502602859462-226d1da32407?auto=format&fit=crop&w=800',
    description: 'Skip the lines and enjoy a guided tour of Paris’s most famous landmark.',
    duration: '2 Hours',
    highlights: ['Top floor access', 'City views', 'Guide']
  },
  {
    id: 7,
    location: 'Paris',
    type: 'package',
    title: 'Romantic Paris',
    price: 1399,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1502602859462-226d1da32407?auto=format&fit=crop&w=800',
    description: 'A romantic getaway with luxury hotels, candlelit dinners, and Seine river cruises.',
    duration: '4 Days',
    highlights: ['Seine cruise', 'Louvre VIP', 'Wine tasting']
  },
  {
    id: 8,
    location: 'New York',
    type: 'activity',
    title: 'Broadway Show',
    price: 189,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1485813502046-24883fe0f91d?auto=format&fit=crop&w=800',
    description: 'Experience world-class theater with premium seating and a guided city walk.',
    duration: '3 Hours'
  },
  {
    id: 9,
    location: 'New York',
    type: 'package',
    title: 'NYC Explorer',
    price: 1499,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800',
    description: 'A full New York itinerary with landmark visits, dining, and sightseeing tours.',
    duration: '6 Days'
  },
  {
    id: 10,
    location: 'Rome',
    type: 'activity',
    title: 'Colosseum Tour',
    price: 89,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800',
    description: 'Enjoy a historical journey through Rome’s ancient heart with an expert guide.'
  },
  {
    id: 11,
    location: 'Rome',
    type: 'package',
    title: 'Roman Holiday',
    price: 1199,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800',
    description: 'A premium package featuring guided tours, luxury stays, and authentic cuisine.'
  },
  {
    id: 12,
    location: 'Kyoto',
    type: 'package',
    title: 'Kyoto Zen Experience',
    price: 899,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800',
    description: 'Immerse yourself in ancient Japanese culture with temple stays and tea ceremonies.',
    duration: '4 Days',
    highlights: ['Zen garden visit', 'Tea ceremony', 'Bamboo grove walk'],
    includes: ['Ryokan stay', 'Daily meals', 'Local guide']
  },
  {
    id: 13,
    location: 'Santorini',
    type: 'package',
    title: 'Greek Island Dream',
    price: 1599,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800',
    description: 'Breathtaking caldera views, luxury whitewashed villas, and Mediterranean dining.',
    duration: '5 Days',
    highlights: ['Sunset yacht cruise', 'Wine tour', 'Oia exploration'],
    includes: ['Boutique hotel', 'Breakfast', 'Private transfer']
  }
];
