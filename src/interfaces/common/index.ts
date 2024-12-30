import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { EDirectionSort } from "src/enums/common";

export interface IQueries<TFieldSelected = any> {
    limit: string;
    page: string;
    sortBy: string;
    sortChildrenBy: string;
    searchBy: string;
    searchVal: string;
    filterBy: string;
    filterVal: string;
    sortDir: string | EDirectionSort;
    fieldsSelected: Array<keyof TFieldSelected>;
    [key: string]: string | number | boolean | any;
}

export interface IBaseResponse<T> {
    message: string;
    metadata?: T;
    statusCode?: StatusCodes;
    reasonStatusCode?: ReasonPhrases;
}

export interface IErrorResponse {
    path: string;
    error: string;
    message: string;
    statusCode: number;
    timestamp: string;
}

export interface IGetManyItem<T> {
    totalItems: number;
    items: Array<T>;
}
