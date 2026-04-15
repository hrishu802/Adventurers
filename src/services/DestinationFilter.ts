import { DestinationEntity } from '../models/Destination';

export class DestinationFilter {
  private location: string = 'All';
  private priceRange: [number, number] = [0, 2000];
  private minRating: number = 0;

  setLocation(location: string): this {
    this.location = location;
    return this;
  }

  setPriceRange(range: [number, number]): this {
    this.priceRange = range;
    return this;
  }

  setRating(minRating: number): this {
    this.minRating = minRating;
    return this;
  }

  apply(destinations: DestinationEntity[]): DestinationEntity[] {
    return destinations.filter(destination => {
      if (this.location !== 'All' && destination.location !== this.location) {
        return false;
      }

      if (destination.price < this.priceRange[0] || destination.price > this.priceRange[1]) {
        return false;
      }

      if (destination.rating < this.minRating) {
        return false;
      }

      return true;
    });
  }
}
