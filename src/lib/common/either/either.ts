export class Left<L> {
  constructor(readonly value: L) {}

  isLeft(): this is Left<L> {
    return true;
  }

  isRight(): this is Right<any> {
    return false;
  }
}

export class Right<R> {
  constructor(readonly value: R) {}

  isLeft(): this is Left<any> {
    return false;
  }

  isRight(): this is Right<R> {
    return true;
  }
}

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L>(value: L): Either<L, never> => new Left(value);
export const right = <R>(value: R): Either<never, R> => new Right(value);
