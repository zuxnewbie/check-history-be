import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import {
  ChangePasswordAuthDto,
  CodeAuthDto,
  LoginDto,
  RegisterDto,
} from './auth.dto';
import { IResponseLogin } from 'src/interfaces/common';
import { User, UserDocument } from '../Users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokensService } from '../tokens/tokens.service';
import { UsersService } from '../Users/users.service';
import { UtilTransform } from '@/utils';

@Injectable()
// @UseInterceptors(CacheInterceptor)
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private tokenService: TokensService,
    private usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { user_email, user_pass } = loginDto;

    const findUser = await this.userModel.findOne({
      user_email,
      isDeleted: false,
    });

    console.log('findUser', findUser);

    if (!findUser) {
      throw new BadRequestException(
        'Người dùng không tồn tại trong hệ thống, vui lòng thử lại',
      );
    }

    // 2. Check password has correct
    if (!findUser.user_isRootAdmin) {
      // Check if the password is correct
      const isMatchedPass = await UtilTransform.comparePassword({
        password: user_pass,
        passwordHashed: findUser.user_pass,
      });

      if (!isMatchedPass) {
        throw new BadRequestException('Mật khẩu không đúng, vui lòng thử lại');
      }
    }

    // 3. Create token
    const { token, user } = await this.tokenService.createToken(findUser);

    // 4. Save to cache session login
    // await this.redisStore.store.set(
    //   `${CONST_REDIS.AUTH.LOGIN}:${user.userId}`,
    //   JSON.stringify(user),
    //   UtilConverts.convertTimeToMilisecond({
    //     typeTime: ETime.DAY,
    //     value: 10,
    //   }),
    // );
    console.log('token:::', token);

    return {
      token,
      user,
    } as IResponseLogin;
  }

  async logout(req: Request): Promise<boolean> {
    const dataUser = req['user'];

    console.log('dataUser:::', dataUser, new Date());

    return true;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;
    const isValidPassword = await UtilTransform.comparePassword({
      password: pass,
      passwordHashed: user.user_pass,
    });

    if (!isValidPassword) return null;
    return user;
  }

  async register(registerDto: RegisterDto) {
    return await this.usersService.register(registerDto);
  }

  async checkCode(data: CodeAuthDto) {
    return await this.usersService.handleActive(data);
  }

  async retryActive(data: string) {
    return await this.usersService.retryActive(data);
  }

  async retryPassword(data: string) {
    return await this.usersService.retryPassword(data);
  }

  async changePassword(data: ChangePasswordAuthDto) {
    return await this.usersService.changePassword(data);
  }

  async getMe(req: Request): Promise<any> {
    const dataUser = req['user'];

    console.log('dataUser:::', dataUser, new Date());

    return true;
  }
}
