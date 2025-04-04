import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value) as object;
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Validation failed',
        statusCode: 400,
        errors: errors.map((error) => ({
          [error.property]: error.constraints
            ? Object.values(error.constraints).join(', ')
            : '',
        })),
      });
    }
    return value;
  }
  private toValidate(
    metatype: { new (...args: any[]): any } | ((...args: any[]) => any),
  ): boolean {
    const types: (new (...args: any[]) => any)[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype as new (...args: any[]) => any);
  }
}
