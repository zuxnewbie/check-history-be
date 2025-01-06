import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../Users/user.schema';

export type TokenDocument = Token & Document;

@Schema({ collection: 'tokens' })
export class Token {
  @Prop({ type: String, required: true })
  token_code: string;

  @Prop({ type: String, required: true })
  token_key: string;

  @Prop({ type: String, ref: 'User' })
  token_user: User;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
