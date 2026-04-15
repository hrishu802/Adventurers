import { Destination as DestinationData, DestinationType } from '../types';

export abstract class DestinationEntity {
  readonly id: number | string;
  readonly location: string;
  readonly rating: number;
  readonly price: number;
  readonly image: string;
  readonly type: DestinationType;
  readonly name?: string;
  readonly title?: string;
  readonly description?: string;
  readonly desc?: string;
  readonly duration?: string;
  readonly includes?: string[];

  constructor(data: DestinationData) {
    this.id = data.id;
    this.location = data.location;
    this.rating = data.rating;
    this.price = data.price;
    this.image = data.image;
    this.type = data.type || 'activity';
    this.name = data.name;
    this.title = data.title;
    this.description = data.description;
    this.desc = data.desc;
    this.duration = data.duration;
    this.includes = data.includes;
  }

  abstract get category(): string;

  get displayTitle(): string {
    return this.title || this.name || 'Adventure';
  }

  get displayDescription(): string {
    return this.description || this.desc || 'Discover an unforgettable travel experience.';
  }
}

export class ActivityDestination extends DestinationEntity {
  get category(): string {
    return 'Activity';
  }
}

export class PackageDestination extends DestinationEntity {
  get category(): string {
    return 'Package';
  }
}
