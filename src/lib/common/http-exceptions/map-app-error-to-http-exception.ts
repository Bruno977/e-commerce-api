import {
  BadRequestException,
  ConflictException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { AppError } from '../errors/app-error';
import { NotAllowedError } from '../errors/not-allowed.error';
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists.error';

export function mapAppErrorToHttpException(error: AppError) {
  if (error instanceof NotAllowedError) {
    return new MethodNotAllowedException(error.message);
  }

  if (error instanceof ResourceAlreadyExistsError) {
    return new ConflictException(error.message);
  }

  return new BadRequestException(error.message);
}
