import { Hasher } from '../../application/cryptography/hasher';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 8;

export class BcryptHasher implements Hasher {
  async hash(value: string): Promise<string> {
    const hashed = await bcrypt.hash(value, SALT_ROUNDS);
    return hashed;
  }
  compare(value: string, hash: string): Promise<boolean> {
    const isMatch = bcrypt.compare(value, hash);
    return isMatch;
  }
}
