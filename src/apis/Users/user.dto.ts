import { User } from './user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';
import { MESS_ERROR_VN } from 'src/constants';
import { EGender } from 'src/enums/common';

const MIN_LENGTH_PASS = 6;

export class CreateUserDto extends PartialType(User) {
  @ApiProperty({ type: String })
  @IsNotEmpty({
    message: MESS_ERROR_VN.FIELD_NOT_EMPTY('Name'),
  })
  user_name: string;

  @ApiProperty({ type: String, default: 'admin@gmail.com' })
  @IsNotEmpty({
    message: MESS_ERROR_VN.FIELD_NOT_EMPTY('Email'),
  })
  @IsEmail(
    {},
    {
      message: MESS_ERROR_VN.EMAIL,
    },
  )
  user_email: string;

  @ApiProperty({ type: String, default: 'admin123@' })
  @IsNotEmpty({
    message: MESS_ERROR_VN.FIELD_NOT_EMPTY('Password'),
  })
  @MinLength(MIN_LENGTH_PASS, {
    message: MESS_ERROR_VN.MIN_LENGTH({
      field: 'Mật khẩu',
      length: MIN_LENGTH_PASS,
    }),
  })
  user_pass: string;

  @ApiProperty({ type: String, default: '0383697460' })
  @IsNotEmpty({ message: MESS_ERROR_VN.FIELD_NOT_EMPTY('Số điện thoại') })
  @IsPhoneNumber('VN', {
    message: MESS_ERROR_VN.PHONE_NUMBER,
  })
  user_phone: string;

  @ApiProperty({ type: String, enum: EGender })
  @IsNotEmpty({ message: MESS_ERROR_VN.FIELD_NOT_EMPTY('Giới tính') })
  user_gender: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: String })
  @IsNotEmpty({
    message: MESS_ERROR_VN.FIELD_NOT_EMPTY('Name'),
  })
  user_name: string;

  @ApiProperty({ type: String, default: 'admin@gmail.com' })
  @IsNotEmpty({
    message: MESS_ERROR_VN.FIELD_NOT_EMPTY('Email'),
  })
  @IsEmail(
    {},
    {
      message: MESS_ERROR_VN.EMAIL,
    },
  )
  user_email: string;

  @ApiProperty({ type: String, default: 'admin123@' })
  @IsNotEmpty({
    message: MESS_ERROR_VN.FIELD_NOT_EMPTY('Password'),
  })
  @MinLength(MIN_LENGTH_PASS, {
    message: MESS_ERROR_VN.MIN_LENGTH({
      field: 'Mật khẩu',
      length: MIN_LENGTH_PASS,
    }),
  })
  user_pass: string;

  @ApiProperty({ type: String, default: '0383697460' })
  @IsNotEmpty({ message: MESS_ERROR_VN.FIELD_NOT_EMPTY('Số điện thoại') })
  @IsPhoneNumber('VN', {
    message: MESS_ERROR_VN.PHONE_NUMBER,
  })
  user_phone: string;

  @ApiProperty({ type: String, enum: EGender })
  @IsNotEmpty({ message: MESS_ERROR_VN.FIELD_NOT_EMPTY('Giới tính') })
  user_gender: string;
}
