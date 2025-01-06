import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { MESS_ERROR_VN } from 'src/constants';

export class LoginDto {
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
  _id: string;

  @IsNotEmpty({ message: 'code không được để trống' })
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
  @IsNotEmpty({ message: 'code không được để trống' })
  code: string;

  @IsNotEmpty({ message: 'password không được để trống' })
  user_pass: string;

  @IsNotEmpty({ message: 'confirmPassword không được để trống' })
  user_confirmPass: string;

  @IsNotEmpty({ message: 'email không được để trống' })
  user_email: string;
}
