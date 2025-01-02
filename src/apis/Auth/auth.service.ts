import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from './auth.dto';

@Injectable()
// @UseInterceptors(CacheInterceptor)
export class AuthService {
  constructor() {}

  async login(loginDto: LoginDto): Promise<any> {
    return true;
  }

  async logout(req: Request): Promise<boolean> {
    const dataUser = req['user'];

    console.log('dataUser:::', dataUser, new Date());

    return true;
  }

  async getMe(req: Request): Promise<any> {
    const dataUser = req['user'];

    console.log('dataUser:::', dataUser, new Date());

    return true;
  }
}
