import {
  IBaseModel,
  ISoftDeleteModel,
  ITrackingModel,
} from './base.interfaces';

export interface IUser
  extends IBaseModel,
    ISoftDeleteModel<IUser>,
    ITrackingModel<IUser> {
  user_avatar?: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_pass: string;
  user_gender: string;
  user_isRootAdmin: boolean;
  user_isBlocked: boolean;
  codeId: string;
  codeExpired: Date;
}

export interface IToken extends IBaseModel {
  token_key: string;
  token_code: string;
  token_user: IUser | string;
}
