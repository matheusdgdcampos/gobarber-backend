import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  public async hashContent(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async compareHashContent(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
