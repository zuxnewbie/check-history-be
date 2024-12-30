import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { IDataUser } from 'src/interfaces/user';

export class HelperToken {
  static createDoubleKeys() {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    });
    return { privateKey, publicKey };
  }

  static async createNewToken({
    privateKey,
    payload,
    jwtService,
  }: {
    payload: IDataUser;
    privateKey: string;
    jwtService: JwtService;
  }): Promise<string> {
    const newToken = await jwtService.signAsync(payload, {
      algorithm: 'RS256',
      expiresIn: '15d',
      secret: privateKey,
    });

    return newToken;
  }

  static async verifyToken({
    token,
    publicKey,
    jwtService,
  }: {
    token: string;
    publicKey: string;
    jwtService: JwtService;
  }): Promise<IDataUser> {
    try {
      const payload: IDataUser = await jwtService.verifyAsync(token, {
        secret: publicKey,
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException(
        'Session token hết hạn, vui lòng đăng nhập lại',
      );
    }
  }
}
