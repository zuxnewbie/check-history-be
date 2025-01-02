import { IUser } from '.';

export interface IBaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface ITrackingModel<T = any> {
  createdBy: T | string;
  updatedBy?: T | string;
}

export interface ISoftDeleteModel<T = any> {
  deletedBy: T | string;
  deletedAt: Date;
  isDeleted: boolean;
}

export interface IToken extends IBaseModel {
  token_key: string;
  token_code: string;
  token_user: IUser | string;
}
