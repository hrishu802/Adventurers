import { Destination as DestinationData } from '../types';
import { ActivityDestination, PackageDestination, DestinationEntity } from '../models/Destination';

export class DestinationFactory {
  static create(data: DestinationData): DestinationEntity {
    if (data.type === 'package') {
      return new PackageDestination(data);
    }

    return new ActivityDestination(data);
  }

  static createList(items: DestinationData[]): DestinationEntity[] {
    return items.map(item => this.create(item));
  }
}
