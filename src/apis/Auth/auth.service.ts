import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from './auth.dto';
import { UtilCompares } from 'src/utils';
import { IResponseLogin } from 'src/interfaces/common';
import { User, UserDocument } from '../Users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
// @UseInterceptors(CacheInterceptor)
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private tokenService: TokensService,
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
      const isMatchedPass = await UtilCompares.comparePassword({
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

  async getMe(req: Request): Promise<any> {
    const dataUser = req['user'];

    console.log('dataUser:::', dataUser, new Date());

    return true;
  }
}
