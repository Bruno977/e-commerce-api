export class Id {
  constructor(private readonly _value: string) {
    if (!this._value) {
      throw new Error('Id cannot be empty');
    }
  }
  toValue(): string {
    return this._value;
  }
  equals(id: Id): boolean {
    return this._value === id._value;
  }
  toString(): string {
    return this._value;
  }
  static create(id?: string): Id {
    return new Id(id ?? crypto.randomUUID());
  }
}
// import { randomUUID } from 'node:crypto';

// export class UniqueEntityID {
//   private value: string;

//   toString() {
//     return this.value;
//   }

//   toValue() {
//     return this.value;
//   }

//   constructor(value?: string) {
//     this.value = value ?? randomUUID();
//   }

//   public equals(id: UniqueEntityID) {
//     return id.toValue() === this.value;
//   }
// }
