import * as bcrypt from 'bcrypt';
export class UtilTransform {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  static randomId(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
    let result = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
}
