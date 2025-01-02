import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UtilConverts } from 'src/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { IGetManyItem, IQueries } from 'src/interfaces/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { CONST_VAL } from 'src/constants';
import { UtilCalculator } from 'src/utils/calculator.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {
    // this.initAdmin();
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log('createUserDto::', createUserDto);

    const checkEmail = await this.findOneByEmail(createUserDto.user_email);

    if (checkEmail) {
      throw new BadRequestException(
        'Email đã tồn tại, vui lòng nhập email khác',
      );
    }

    const dataUser = this.usersRepository.create({
      ...createUserDto,
    });

    const newUser = await this.usersRepository.save(dataUser);

    return newUser;
  }

  async findOneById(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: { id },
      relations: {},
    });
  }

  async findOneByPhone(phone: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { user_phone: phone } });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { user_email: email } });
  }

  async findAll(queries: IQueries): Promise<IGetManyItem<UserEntity>> {
    const sortByVal: keyof UserEntity =
      (queries.sortBy as keyof UserEntity) || 'createdAt';

    const [items, totalItems] = await Promise.all([
      this.usersRepository.find({
        take: +queries.limit || CONST_VAL.LIMIT_DEFAULT,
        skip: UtilCalculator.calculatorSkipPage({
          limit: queries.limit,
          page: queries.page,
        }),
        relations: {
          createdBy: true,
          updatedBy: true,
          deletedBy: true,
        },
        order: { [sortByVal]: queries.sortDir },
        where: UtilConverts.convertCondition(queries),
      }),
      this.usersRepository.count({
        where: UtilConverts.convertCondition(queries),
      }),
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

    const dataUpdated = this.usersRepository.create({
      ...findUser,
      ...updateUserDto,
    });

    const userUpdated = await this.usersRepository.save(dataUpdated);

    if (!userUpdated) {
      throw new BadRequestException('Cập nhật blog thất bại');
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

    const userRestored = await this.usersRepository.update(id, {
      isDeleted: false,
    });

    return Boolean(userRestored.affected);
  }

  async softRemove({
    id,
    req,
  }: {
    id: string;
    req: Request;
  }): Promise<boolean> {
    const currentUser = await this.authService.getMe(req);

    if (currentUser.id === id) {
      throw new BadRequestException('Thao tác xóa không hợp lệ');
    }

    const user = await this.findOneById(id);

    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    const userSoftDeleted = await this.usersRepository.update(id, {
      isDeleted: true,
      deletedBy: currentUser,
    });

    return Boolean(userSoftDeleted.affected);
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findOneById(id);

    if (!user || !user.isDeleted) {
      throw new BadRequestException('Xóa người dùng không thành công');
    }

    const userDeleted = await this.usersRepository.delete(user.id);

    return Boolean(userDeleted.affected);
  }

  // private async initAdmin() {
  //   const findRootAdminByPhone = await this.usersRepository.findOne({
  //     where: { user_phone: process.env.ADMIN_PHONE },
  //   });
  //   const findRootAdminByEmail = await this.usersRepository.findOne({
  //     where: { user_email: process.env.ADMIN_EMAIL },
  //   });

  //   if (findRootAdminByPhone || findRootAdminByEmail) {
  //     return;
  //   }

  //   const dataAdminCreate = this.usersRepository.create({
  //     user_isRootAdmin: true,
  //     user_phone: process.env.ADMIN_PHONE,
  //     user_gender: EGender.MALE,
  //     user_email: process.env.ADMIN_EMAIL,
  //     user_name: process.env.ADMIN_NAME,
  //     user_pass: process.env.ADMIN_PASS,
  //   });

  //   if (!findRootAdminByEmail || !findRootAdminByPhone) {
  //     await this.usersRepository.save(dataAdminCreate);
  //   }
  // }
}
