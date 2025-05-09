export class Id {
  constructor(private readonly _value: string) {
    if (!this._value) {
      throw new Error('Id cannot be empty');
    }
  }
  get value(): string {
    return this._value;
  }
  equals(id: Id): boolean {
    return this.value === id.value;
  }
  toString(): string {
    return this.value;
  }
  static create(id?: string): Id {
    return new Id(id ?? crypto.randomUUID());
  }
}
