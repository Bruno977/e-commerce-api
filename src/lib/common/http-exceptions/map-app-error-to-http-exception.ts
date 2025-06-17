import {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppError } from '../errors/app-error';
import { NotAllowedError } from '../errors/not-allowed.error';
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists.error';

export function mapAppErrorToHttpException(error: AppError) {
  if (error instanceof NotAllowedError) {
    return new UnauthorizedException(error.message);
  }

  if (error instanceof ResourceAlreadyExistsError) {
    return new ConflictException(error.message);
  }

  return new BadRequestException(error.message);
}
