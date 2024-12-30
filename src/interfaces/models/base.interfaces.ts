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
