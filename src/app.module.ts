import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { HttpModule } from './modules/auth/infra/http/http.module';
import { AuthModule } from './modules/auth/infra/auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
