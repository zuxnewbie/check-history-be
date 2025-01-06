import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './token.schema';
import { User, UserDocument } from '../Users/user.schema';
import { IDataUser } from 'src/interfaces/user';
import { IResponseLogin } from 'src/interfaces/common';
import { HelperToken } from 'src/helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createToken(user: UserDocument): Promise<IResponseLogin> {
    // 3. Create payload for token
    const payload: IDataUser = {
      userId: user.id,
      userEmail: user.user_email,
      userName: user.user_name,
      userIsRootAdmin: user.user_isRootAdmin,
    };

    // 4. Create token when login success
    const { privateKey, publicKey } = HelperToken.createDoubleKeys();

    const newTokenCode = await HelperToken.createNewToken({
      privateKey,
      jwtService: this.jwtService,
      payload,
    });

    const findToken = await this.findOneByUser(user);

    const dataToken = new this.tokenModel({
      token_code: newTokenCode,
      token_key: publicKey,
      token_user: user._id,
    });

    if (!findToken) {
      const newToken = await dataToken.save();
      if (!newToken) {
        throw new BadRequestException('Đăng nhập thất bại');
      }
    } else {
      const updatedToken = await this.tokenModel
        .findByIdAndUpdate(
          findToken._id,
          { token_code: newTokenCode, token_key: publicKey },
          { new: true },
        )
        .exec();
      if (!updatedToken) {
        throw new BadRequestException('Đăng nhập thất bại');
      }
    }

    return { token: newTokenCode, user: payload };
  }

  async findOneByUser(user: UserDocument): Promise<TokenDocument> {
    return await this.tokenModel.findOne({ token_user: user._id }).exec();
  }

  async findAll(): Promise<Token[]> {
    return await this.tokenModel.find().exec();
  }
}
