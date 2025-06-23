import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppError } from '../errors/app-error';
import { NotAllowedError } from '../errors/not-allowed.error';
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists.error';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

export function mapAppErrorToHttpException(error: AppError) {
  if (error instanceof NotAllowedError) {
    return new UnauthorizedException(error.message);
  }

  if (error instanceof ResourceAlreadyExistsError) {
    return new ConflictException(error.message);
  }
  if (error instanceof ResourceNotFoundError) {
    return new NotFoundException(error.message);
  }

  return new BadRequestException(error.message);
}
