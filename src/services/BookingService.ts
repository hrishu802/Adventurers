import { BookingStep } from '../types';

export class BookingService {
  submitDetails(): BookingStep {
    return 'payment';
  }

  submitPayment(): BookingStep {
    return 'success';
  }

  reset(): BookingStep {
    return 'details';
  }
}
