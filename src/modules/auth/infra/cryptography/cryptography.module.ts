import { Module } from '@nestjs/common';
import { Encrypt } from '../../application/cryptography/encrypt';
import { JwtEncrypt } from './jwt-encrypt';
import { Hasher } from '../../application/cryptography/hasher';
import { BcryptHasher } from './bcrypt-hasher';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    JwtService,
    {
      provide: Encrypt,
      useClass: JwtEncrypt,
    },
    {
      provide: Hasher,
      useClass: BcryptHasher,
    },
  ],
  exports: [Hasher, Encrypt],
})
export class CryptographyModule {}
