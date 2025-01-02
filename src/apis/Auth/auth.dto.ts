import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
import { MESS_ERROR_VN } from 'src/constants';

export class LoginDto {
  @IsEmail({}, { message: MESS_ERROR_VN.EMAIL })
  @ApiProperty({ default: 'admin@gmail.com' })
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

export class ResetPasswordDto {
  @IsEmail({}, { message: MESS_ERROR_VN.EMAIL })
  @ApiProperty({ default: 'admin@gmail.com' })
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
