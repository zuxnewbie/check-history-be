import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotAcceptableException,
} from '@nestjs/common';
import { Request } from 'express';
import { CONST_VAL } from 'src/constants';
import { JwtService } from '@nestjs/jwt';
import { Token } from '@/apis/tokens/token.schema';
import { IDataUser } from '@/interfaces/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('in');

    const request = context.switchToHttp().getRequest<Request>();

    // Check AT
    const token = request.cookies?.[CONST_VAL.TOKEN_NAME];
    if (!token) {
      throw new NotAcceptableException('Token đâu rồi?!');
    }

    const keyStore = await this.tokenModel.findOne({ token_code: token });

    if (!keyStore) {
      throw new NotAcceptableException('Token không thấy đâu');
    }

    try {
      const payload: IDataUser = await this.jwtService.verifyAsync(token, {
        secret: keyStore.token_key,
      });
      request[CONST_VAL.REQ_USER] = {
        userId: payload.userId,
        userName: payload.userName,
        userEmail: payload.userEmail,
      } as IDataUser;
    } catch {
      // Refresh token again
      throw new UnauthorizedException('Phiên bản hết hạn');
    }

    return true;
  }
}
