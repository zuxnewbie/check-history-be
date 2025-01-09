import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { MESS_ERROR_VN } from 'src/constants';

export class LoginDto {
  @IsEmail({}, { message: MESS_ERROR_VN.EMAIL })
  @ApiProperty({ default: 'zzz@gmail.com' })
  user_email: string;

  @ApiProperty({ default: 'admin123@' })
  @MinLength(6, {
    message: MESS_ERROR_VN.MIN_LENGTH({
      field: 'Mật khẩu',
      length: 6,
    }),
  })
  user_pass: string;

  // @ApiProperty({ default: 'access_token' })
  // access_token: string;
}

export class RegisterDto {
  @ApiProperty({ default: 'Name', required: true })
  user_name: string;

  @IsEmail({}, { message: MESS_ERROR_VN.EMAIL })
  @ApiProperty({ default: 'tocchienofvu@gmail.com' })
  user_email: string;

  @ApiProperty({ default: 'admin123@' })
  @MinLength(6, {
    message: MESS_ERROR_VN.MIN_LENGTH({
      field: 'Mật khẩu',
      length: 6,
    }),
  })
  user_pass: string;
}

export class CodeAuthDto {
  @IsNotEmpty({ message: '_id không được để trống' })
  @ApiProperty({ default: 'id', name: '_id' })
  _id: string;

  @IsNotEmpty({ message: 'code không được để trống' })
  @ApiProperty({ default: 'abcd', name: 'code' })
  code: string;
}

export class ResetPasswordDto {
  @IsEmail({}, { message: MESS_ERROR_VN.EMAIL })
  @ApiProperty({ default: 'tocchienofvu@gmail.com' })
  user_email: string;

  @ApiProperty({ default: 'admin123' })
  @MinLength(6, {
    message: MESS_ERROR_VN.MIN_LENGTH({
      field: 'Mật khẩu',
      length: 6,
    }),
  })
  user_pass: string;

  @ApiProperty({ default: 'admin123' })
  @MinLength(6, {
    message: MESS_ERROR_VN.MIN_LENGTH({
      field: 'Mật khẩu xác nhận',
      length: 6,
    }),
  })
  user_confirmPass: string;
}

export class ChangePasswordAuthDto {
  @ApiProperty({ default: 'code' })
  @IsNotEmpty({ message: 'code không được để trống' })
  code: string;

  @ApiProperty({ default: 'user_pass' })
  @IsNotEmpty({ message: 'password không được để trống' })
  user_pass: string;

  @ApiProperty({ default: 'user_confirmPass' })
  @IsNotEmpty({ message: 'confirmPassword không được để trống' })
  user_confirmPass: string;

  @ApiProperty({ default: 'user_email' })
  @IsNotEmpty({ message: 'email không được để trống' })
  user_email: string;
}
