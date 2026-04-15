import { DestinationFilter } from './DestinationFilter';
import { SortContext, ISortStrategy } from '../strategies/SortStrategy';
import { destinationRecords } from '../data/destinations';
import { DestinationFactory } from './DestinationFactory';
import { DestinationEntity } from '../models/Destination';

export class DestinationRepository {
  private static instance: DestinationRepository;
  private destinations: DestinationEntity[];

  private constructor() {
    this.destinations = DestinationFactory.createList(destinationRecords);
  }

  static getInstance(): DestinationRepository {
    if (!DestinationRepository.instance) {
      DestinationRepository.instance = new DestinationRepository();
    }

    return DestinationRepository.instance;
  }

  getDestinations(filter: DestinationFilter, strategy: ISortStrategy): DestinationEntity[] {
    const filtered = filter.apply(this.destinations);
    return strategy.sort(filtered);
  }

  getLocations(): string[] {
    return ['All', ...Array.from(new Set(this.destinations.map(dest => dest.location)))].sort();
  }

  getAll(): DestinationEntity[] {
    return [...this.destinations];
  }
}
