import { PartialType } from '@nestjs/mapped-types';
import { TokenEntity } from './token.entity';
import { UserEntity } from '../users/user.entity';
import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { MESS_ERROR_VN } from 'src/constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenDto extends PartialType(TokenEntity) {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: MESS_ERROR_VN.FIELD_NOT_EMPTY('Token') })
  token_code: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: MESS_ERROR_VN.FIELD_NOT_EMPTY('Token key') })
  token_key: string;

  @ApiProperty()
  @IsNotEmptyObject(
    { nullable: false },
    { message: MESS_ERROR_VN.FIELD_NOT_EMPTY('Người dùng') },
  )
  token_user: UserEntity;
}

export class UpdateTokenDto extends PartialType(CreateTokenDto) {}
