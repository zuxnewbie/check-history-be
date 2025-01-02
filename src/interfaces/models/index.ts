import {
  IBaseModel,
  ISoftDeleteModel,
  ITrackingModel,
} from './base.interfaces';

export * from './base.interfaces';

export interface IUser
  extends IBaseModel,
    ISoftDeleteModel<IUser>,
    ITrackingModel<IUser> {
  user_name: string;
  user_email: string;
  user_phone: string;
  user_pass: string;
  user_gender: string;
  user_isRootAdmin: boolean;
  user_isBlocked: boolean;
}
