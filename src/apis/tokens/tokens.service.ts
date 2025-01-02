import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenEntity, TokenDocument } from './token.entity';
import { UserEntity, UserDocument } from '../Users/user.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(TokenEntity.name) private tokenModel: Model<TokenDocument>,
    @InjectModel(UserEntity.name) private userModel: Model<UserDocument>,
  ) {}

  async createToken(
    user: UserDocument,
    newTokenCode: string,
    publicKey: string,
  ): Promise<{ token: string; user: any }> {
    const payload = { id: user._id, email: user.user_email };

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

  async findAll(): Promise<TokenEntity[]> {
    return await this.tokenModel.find().exec();
  }
}
