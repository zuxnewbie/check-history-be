import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ABaseModal } from 'src/abstracts/models';
import { IUser } from 'src/interfaces/models';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User extends ABaseModal implements IUser {
  @Prop({ type: String, required: true, unique: true })
  user_email: string;

  @Prop({ type: String, required: true })
  user_pass: string;

  @Prop({ type: String, required: true })
  user_name: string;

  @Prop({ type: String, required: false })
  user_phone: string;

  @Prop({ type: String, required: false })
  user_gender: string;

  @Prop({ type: String, required: false })
  user_avatar?: string;

  @Prop({ type: Boolean, default: false })
  user_isRootAdmin: boolean;

  @Prop({ type: Boolean, default: false })
  user_isBlocked: boolean;

  @Prop({ type: Boolean, default: false })
  user_isActive: boolean;

  @Prop({ type: String, default: false })
  codeId: string;

  @Prop({ type: Date, default: false })
  codeExpired: Date;

  @Prop({ type: String, ref: 'User', nullable: true, name: 'deleted_by' })
  deletedBy: User;

  @Prop({ type: Date, nullable: true, name: 'deleted_at' })
  deletedAt: Date;

  @Prop({ name: 'is_deleted', type: Boolean, nullable: true, default: false })
  isDeleted: boolean;

  @Prop({ type: Date, nullable: true, name: 'created_by' })
  createdBy: User;

  @Prop({ type: Date, nullable: true, name: 'updated_by' })
  updatedBy: User;
}

export const UserSchema = SchemaFactory.createForClass(User);
