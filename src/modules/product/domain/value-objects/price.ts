export class Price {
  private readonly value: number;
  constructor(value: number) {
    if (value <= 0) {
      throw new Error('Price must be greater than zero.');
    }
    this.value = value;
  }
  get amount(): number {
    return this.value;
  }
  applyDiscount(discount: number): Price {
    if (discount < 0 || discount > 100) {
      throw new Error('Discount must be between 0 and 100.');
    }
    const discountedValue = this.value * ((100 - discount) / 100);
    return new Price(discountedValue);
  }
}
