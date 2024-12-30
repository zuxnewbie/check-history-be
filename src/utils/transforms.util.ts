import * as bcrypt from 'bcrypt';
export class UtilTransform {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
