// Global Application Types

export type DestinationType = 'package' | 'activity';
export type BookingStep = 'details' | 'payment' | 'success';

export interface Destination {
    id: number | string;
    name?: string;
    title?: string; // fallback
    location: string;
    rating: number;
    price: number;
    image: string;
    type?: DestinationType;
    description?: string;
    desc?: string;
    duration?: string;
    includes?: string[];
    highlights?: string[];
    itinerary?: { day: number; title: string; description: string }[];
}

export interface Testimonial {
    name: string;
    review: string;
    img: string;
}

export interface ServiceItem {
    title: string;
    description: string;
    image: string;
}

export interface BlogPost {
    title: string;
    excerpt: string;
    image: string;
    author: string;
    date: string;
}
