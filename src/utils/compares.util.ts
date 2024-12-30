import * as bcrypt from 'bcrypt';

export class UtilCompares {
  static async comparePassword({
    password,
    passwordHashed,
  }: {
    password: string;
    passwordHashed: string;
  }): Promise<boolean> {
    return await bcrypt.compare(password, passwordHashed);
  }
}
