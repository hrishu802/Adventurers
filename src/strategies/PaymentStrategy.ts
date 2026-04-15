export type PaymentType = 'card' | 'paypal';

export interface PaymentField {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

export interface IPaymentStrategy {
  getFields(): PaymentField[];
  getSubmitButtonLabel(price: number): string;
}

export class CardPaymentStrategy implements IPaymentStrategy {
  getFields(): PaymentField[] {
    return [
      { name: 'cardNumber', label: 'Card Number', type: 'text', required: true },
      { name: 'expiry', label: 'MM/YY', type: 'text', required: true },
      { name: 'cvv', label: 'CVV', type: 'password', required: true }
    ];
  }

  getSubmitButtonLabel(price: number): string {
    return `Pay $${price}`;
  }
}

export class PayPalPaymentStrategy implements IPaymentStrategy {
  getFields(): PaymentField[] {
    return [];
  }

  getSubmitButtonLabel(price: number): string {
    return `Pay with PayPal ($${price})`;
  }
}

export class PaymentContext {
  static getStrategy(paymentType: PaymentType): IPaymentStrategy {
    switch (paymentType) {
      case 'paypal':
        return new PayPalPaymentStrategy();
      case 'card':
      default:
        return new CardPaymentStrategy();
    }
  }
}
