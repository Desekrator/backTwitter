import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncodeService {
  async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password, salt);

    return await hashPassword;
  }

  async checkPassword(password: string, userPassword: string) {
    return await bcrypt.compare(password, userPassword);
  }
}
