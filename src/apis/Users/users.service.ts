import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { IQueries, IGetManyItem } from 'src/interfaces/common';
import { UpdateUserDto } from './user.dto';
import { UtilCalculator, UtilConverts, UtilTransform } from 'src/utils';
import { CONST_VAL } from 'src/constants';
import { Request } from 'express';
import { CreateUserDto } from './user.dto';
import { EGender } from 'src/enums/common';
import * as dayjs from 'dayjs';
import {
  ChangePasswordAuthDto,
  CodeAuthDto,
  RegisterDto,
} from '../Auth/auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {
    this.initAdmin();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { user_pass } = createUserDto;
    console.log('createUserDto::', createUserDto);

    const checkEmail = await this.findOneByEmail(createUserDto.user_email);
    console.log('checkEmail', checkEmail);

    if (checkEmail) {
      throw new BadRequestException(
        'Email đã tồn tại, vui lòng nhập email khác',
      );
    }

    const hashPW = await UtilTransform.hashPassword(user_pass);

    const createdUser = new this.userModel({
      ...createUserDto,
      user_pass: hashPW,
    });
    return await createdUser.save();
  }

  async findOneByPhone(phone: string): Promise<User> {
    return await this.userModel.findOne({ user_phone: phone }).exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ user_email: email }).exec();
  }

  async findAll(queries: IQueries): Promise<IGetManyItem<User>> {
    const sortByVal: keyof User = (queries.sortBy as keyof User) || 'createdAt';
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
    console.log('findAll items::', items);
    console.log('findAll totalItems::', totalItems);
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

  async remove(id: string): Promise<boolean> {
    const user = await this.findOneById(id);

    if (!user || !user.isDeleted) {
      throw new BadRequestException('Xóa người dùng không thành công');
    }

    const userDeleted = await this.userModel.findByIdAndDelete(id);

    return Boolean(userDeleted);
  }

  async findOneById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async register(registerDto: RegisterDto) {
    const { user_name, user_email, user_pass } = registerDto;
    console.log('out');

    //check email
    const checkEmail = await this.findOneByEmail(user_email);
    if (checkEmail) {
      throw new BadRequestException(
        'Email đã tồn tại, vui lòng nhập email khác',
      );
    }

    // hash pss
    const hashPW = await UtilTransform.hashPassword(user_pass);
    const codeId = UtilTransform.randomId();
    const user = await this.userModel.create({
      user_name,
      user_email,
      user_pass: hashPW,
      isActive: false,
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes').toDate(),
    });

    //send email
    this.mailerService.sendMail({
      to: user.user_email, // list of receivers
      subject: 'Activate your account at zux zux', // Subject line
      template: 'register',
      context: {
        name: user?.user_name ?? user?.user_email,
        activationCode: codeId,
      },
    });
    return {
      _id: user._id,
    };
  }

  async handleActive(data: CodeAuthDto) {
    const user = await this.userModel.findOne({
      _id: data._id,
      codeId: data.code,
    });
    if (!user) {
      throw new BadRequestException('Mã code không hợp lệ hoặc đã hết hạn');
    }

    //check expire code
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);

    if (isBeforeCheck) {
      //valid => update user
      await this.userModel.updateOne(
        { _id: data._id },
        {
          user_isActive: true,
        },
      );
      return { isBeforeCheck };
    } else {
      throw new BadRequestException('Mã code không hợp lệ hoặc đã hết hạn');
    }
  }

  async retryActive(email: string) {
    //check email
    console.log('email', email);

    const user = await this.userModel.findOne({ user_email: email });
    console.log('user', user);
    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }
    if (user.user_isActive) {
      throw new BadRequestException('Tài khoản đã được kích hoạt');
    }

    //send Email
    const codeId = UtilTransform.randomId();

    //update user
    await user.updateOne({
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes'),
    });

    //send email
    this.mailerService.sendMail({
      to: user.user_email, // list of receivers
      subject: 'Activate your account at zux zux', // Subject line
      template: 'register',
      context: {
        name: user?.user_name ?? user.user_email,
        activationCode: codeId,
      },
    });
    return { _id: user._id };
  }

  async retryPassword(email: string) {
    //check email
    const user = await this.userModel.findOne({ user_email: email });

    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }

    //send Email
    const codeId = UtilTransform.randomId();

    //update user
    await user.updateOne({
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes'),
    });

    //send email
    this.mailerService.sendMail({
      to: user.user_email, // list of receivers
      subject: 'Change your password account at checking history', // Subject line
      template: 'register',
      context: {
        name: user?.user_name ?? user.user_email,
        activationCode: codeId,
      },
    });
    return { _id: user._id, email: user.user_email };
  }

  async changePassword(data: ChangePasswordAuthDto) {
    if (data.user_confirmPass !== data.user_pass) {
      throw new BadRequestException(
        'Mật khẩu/xác nhận mật khẩu không chính xác.',
      );
    }

    //check email
    const user = await this.userModel.findOne({ user_email: data.user_email });
    console.log('user', user);

    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }

    // Check if code matches
    if (data.code !== user.codeId) {
      throw new BadRequestException('Mã code không chính xác');
    }

    //check expire code
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);
    console.log('isBeforeCheck', isBeforeCheck, user.codeExpired);

    if (isBeforeCheck) {
      //valid => update password
      const newPassword = await UtilTransform.hashPassword(data.user_pass);
      await user.updateOne({ user_pass: newPassword });
      return { isBeforeCheck };
    } else {
      throw new BadRequestException('Mã code không hợp lệ hoặc đã hết hạn');
    }
  }

  private async initAdmin() {
    const findRootAdminByPhone = await this.userModel
      .findOne({
        user_phone: process.env.ADMIN_PHONE,
      })
      .exec();
    const findRootAdminByEmail = await this.userModel
      .findOne({
        user_email: process.env.ADMIN_EMAIL,
      })
      .exec();

    if (findRootAdminByPhone || findRootAdminByEmail) {
      return;
    }

    const dataAdminCreate = this.userModel.create({
      user_avatar: '',
      user_isRootAdmin: true,
      user_phone: process.env.ADMIN_PHONE,
      user_gender: EGender.MALE,
      user_email: process.env.ADMIN_EMAIL,
      user_name: process.env.ADMIN_NAME,
      user_pass: process.env.ADMIN_PASS,
    });

    if (!findRootAdminByEmail || !findRootAdminByPhone) {
      (await dataAdminCreate).save();
    }
  }
}
