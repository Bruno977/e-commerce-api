import { Module } from '@nestjs/common';
import { RegisterUserController } from './controllers/register-user.controller';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [RegisterUserController],
  providers: [RegisterUserUseCase],
})
export class HttpModule {}
