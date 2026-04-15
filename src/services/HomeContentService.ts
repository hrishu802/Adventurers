import { DestinationRepository } from './DestinationRepository';
import { DestinationEntity } from '../models/Destination';

export interface SearchSuggestion {
  name: string;
  capital: string;
  flag: string;
}

export interface WhyChooseItem {
  title: string;
  desc: string;
  iconName: 'shield' | 'star' | 'headset';
}

export class HomeContentService {
  private repository = DestinationRepository.getInstance();
  private suggestions: SearchSuggestion[] = [
    { name: 'Paris', capital: 'France', flag: '🇫🇷' },
    { name: 'Tokyo', capital: 'Japan', flag: '🇯🇵' },
    { name: 'Bali', capital: 'Indonesia', flag: '🇮🇩' },
    { name: 'New York', capital: 'USA', flag: '🇺🇸' },
    { name: 'Rome', capital: 'Italy', flag: '🇮🇹' }
  ];

  getSearchSuggestions(query: string): SearchSuggestion[] {
    if (!query) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    return this.suggestions.filter(country => country.name.toLowerCase().includes(lowerQuery)).slice(0, 5);
  }

  getFeaturedDestinations(): DestinationEntity[] {
    return this.repository
      .getAll()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }

  getPopularPackages(): DestinationEntity[] {
    return this.repository
      .getAll()
      .filter(destination => destination.type === 'package')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }

  getWhyChooseUs(): WhyChooseItem[] {
    return [
      { iconName: 'shield', title: 'Secure Bookings', desc: 'Your payments and data are fully safe.' },
      { iconName: 'star', title: 'Premium Service', desc: 'We offer curated luxury experiences.' },
      { iconName: 'headset', title: '24/7 Support', desc: 'Always available to help on your trip.' }
    ];
  }

  getTestimonials(): Array<{ name: string; review: string }> {
    return [
      { name: 'Amit Sharma', review: 'Flawless travel experience!' },
      { name: 'Sara Lee', review: 'Incredible destinations and support.' },
      { name: 'John Doe', review: 'The best packages available.' }
    ];
  }
}
