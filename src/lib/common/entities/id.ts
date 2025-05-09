export class Id {
  constructor(private readonly _value: string) {}
  get value(): string {
    return this._value;
  }
  equals(id: Id): boolean {
    return this.value === id.value;
  }
  static create(id?: string): Id {
    return new Id(id ?? crypto.randomUUID());
  }
}
