import { BadRequestException, Injectable } from '@nestjs/common';
import { IResponseLogin } from 'src/interfaces/common';
import { TokenEntity } from './token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperToken } from 'src/helpers';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/user.entity';
import { IDataUser } from 'src/interfaces/user';
@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(TokenEntity)
    private tokenRepositories: Repository<TokenEntity>,
  ) {}

  async create(user: UserEntity): Promise<IResponseLogin> {
    // 3. Create payload for token
    const payload: IDataUser = {
      userId: user.id,
      userEmail: user.user_email,
      userName: `${user.user_name}`,
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

    const dataToken = this.tokenRepositories.create({
      token_code: newTokenCode,
      token_key: publicKey,
      token_user: { id: user.id },
    });

    if (!findToken) {
      const newToken = await this.tokenRepositories.save(dataToken);
      if (!newToken) {
        throw new BadRequestException('Đăng nhập thất bại');
      }
    } else {
      const newToken = await this.tokenRepositories
        .createQueryBuilder()
        .update(TokenEntity)
        .where('id = :id', { id: findToken.id })
        .set({ token_code: newTokenCode, token_key: publicKey })
        .execute();
      if (!newToken.affected) {
        throw new BadRequestException('Đăng nhập thất bại');
      }
    }

    return { token: newTokenCode, user: payload };
  }

  async findAll() {
    return `This action returns all tokens`;
  }

  async findOneById(id: string) {
    return `This action returns a #${id} token`;
  }

  async findOneByCode(code: string) {
    return await this.tokenRepositories.findOne({
      where: { token_code: code },
    });
  }

  async findOneByUser(user: UserEntity) {
    return await this.tokenRepositories.findOne({
      where: { token_user: { id: user.id } },
    });
  }

  async update(id: string) {
    return `This action updates a #${id} token`;
  }

  async removeById(id: string) {
    return await this.tokenRepositories.delete(id);
  }

  async removeByUserId(userId: string) {
    return await this.tokenRepositories
      .createQueryBuilder()
      .delete()
      .where('token_user = :userId', { userId })
      .execute();
  }
}
