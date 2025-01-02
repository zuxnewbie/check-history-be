import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserEntity } from '../Users/user.entity';

export type TokenDocument = TokenEntity & Document;

@Schema({ collection: 'tokens' })
export class TokenEntity {
  @Prop({ type: String, required: true })
  token_code: string;

  @Prop({ type: String, required: true })
  token_key: string;

  @Prop({ type: String, ref: 'UserEntity' })
  token_user: UserEntity;
}

export const TokenSchema = SchemaFactory.createForClass(TokenEntity);
