import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './user.entity';
import { IQueries, IGetManyItem } from 'src/interfaces/common';
import { UpdateUserDto } from './user.dto';
import { UtilCalculator, UtilConverts } from 'src/utils';
import { CONST_VAL } from 'src/constants';
import { Request } from 'express';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log('createUserDto::', createUserDto);

    const checkEmail = await this.findOneByEmail(createUserDto.user_email);

    if (checkEmail) {
      throw new BadRequestException(
        'Email đã tồn tại, vui lòng nhập email khác',
      );
    }

    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findOneByPhone(phone: string): Promise<UserEntity> {
    return await this.userModel.findOne({ user_phone: phone }).exec();
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.userModel.findOne({ user_email: email }).exec();
  }

  async findAll(queries: IQueries): Promise<IGetManyItem<UserEntity>> {
    const sortByVal: keyof UserEntity =
      (queries.sortBy as keyof UserEntity) || 'createdAt';
    const sortDir: 'asc' | 'desc' = queries.sortDir === 'asc' ? 'asc' : 'desc';

    const [items, totalItems] = await Promise.all([
      this.userModel
        .find(UtilConverts.convertCondition(queries))
        .sort({ [sortByVal]: sortDir })
        .skip(
          UtilCalculator.calculatorSkipPage({
            limit: queries.limit,
            page: queries.page,
          }),
        )
        .limit(+queries.limit || CONST_VAL.LIMIT_DEFAULT)
        .populate('createdBy updatedBy deletedBy')
        .exec(),
      this.userModel
        .countDocuments(UtilConverts.convertCondition(queries))
        .exec(),
    ]);

    return {
      items,
      totalItems,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    console.log('updateUserDto:::', updateUserDto);
    const findUser = await this.findOneById(id);

    if (!findUser) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    const userUpdated = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!userUpdated) {
      throw new BadRequestException('Cập nhật người dùng thất bại');
    }

    return Boolean(userUpdated);
  }

  async restore(id: string): Promise<boolean> {
    const user = await this.findOneById(id);

    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    if (!user.isDeleted) {
      throw new BadRequestException('Restore người dùng thất bại');
    }

    const userRestored = await this.userModel
      .findByIdAndUpdate(id, { isDeleted: false }, { new: true })
      .exec();

    return Boolean(userRestored);
  }

  async softRemove({ id }: { id: string; req: Request }): Promise<boolean> {
    const user = await this.findOneById(id);

    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    const userSoftDeleted = await this.userModel
      .findByIdAndUpdate(
        id,
        {
          isDeleted: true,
        },
        { new: true },
      )
      .exec();

    return Boolean(userSoftDeleted);
  }

  async findOneById(id: string): Promise<UserEntity> {
    return await this.userModel.findById(id).exec();
  }
}
