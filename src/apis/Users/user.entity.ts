import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserEntity & Document;

@Schema({ collection: 'users' })
export class UserEntity {
  @Prop({ type: String, required: true, unique: true })
  user_email: string;

  @Prop({ type: String, required: true })
  user_pass: string;

  @Prop({ type: String, required: true })
  user_name: string;

  @Prop({ type: String, required: true })
  user_phone: string;

  @Prop({ type: String, required: true })
  user_gender: string;

  @Prop({ type: Boolean, default: false })
  user_isRootAdmin: boolean;

  @Prop({ type: Boolean, default: false })
  user_isBlocked: boolean;

  @Prop({ type: String, ref: 'UserEntity', nullable: true })
  deletedBy: UserEntity;

  @Prop({ type: Date, nullable: true })
  deletedAt: Date;

  @Prop({ type: Date, nullable: true })
  createdAt: Date;

  @Prop({ type: Date, nullable: true })
  isDeleted: Date;

  @Prop({ type: Date, nullable: true })
  createdBy: UserEntity;

  @Prop({ type: Date, nullable: true })
  updatedBy: UserEntity;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
