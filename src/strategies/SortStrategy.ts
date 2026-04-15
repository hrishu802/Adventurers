import { DestinationEntity } from '../models/Destination';

export type SortType = 'popularity' | 'priceAsc' | 'priceDesc';

export interface ISortStrategy {
  sort(destinations: DestinationEntity[]): DestinationEntity[];
}

export class PopularitySortStrategy implements ISortStrategy {
  sort(destinations: DestinationEntity[]): DestinationEntity[] {
    return [...destinations].sort((a, b) => b.rating - a.rating);
  }
}

export class PriceAscSortStrategy implements ISortStrategy {
  sort(destinations: DestinationEntity[]): DestinationEntity[] {
    return [...destinations].sort((a, b) => a.price - b.price);
  }
}

export class PriceDescSortStrategy implements ISortStrategy {
  sort(destinations: DestinationEntity[]): DestinationEntity[] {
    return [...destinations].sort((a, b) => b.price - a.price);
  }
}

export class SortContext {
  static getStrategy(type: SortType): ISortStrategy {
    switch (type) {
      case 'priceAsc':
        return new PriceAscSortStrategy();
      case 'priceDesc':
        return new PriceDescSortStrategy();
      case 'popularity':
      default:
        return new PopularitySortStrategy();
    }
  }
}
