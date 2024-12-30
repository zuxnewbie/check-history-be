import { IBaseResponse } from "src/interfaces/common";

export declare abstract class RESPONSE<T = any> {
    message: string;
    metadata: T | undefined;
    abstract statusCode: number;
    abstract reasonStatusCode: string;
    constructor({ message, metadata }: IBaseResponse<T>);
}

export class OK<T = any> extends RESPONSE<T> {
    statusCode: number = 200;
    reasonStatusCode: string = 'OK';
    constructor({ message, metadata }: IBaseResponse<T>) {
        super({ message, metadata });
    }
}

export class CREATE<T = any> extends RESPONSE<T> {
    statusCode: number = 201;
    reasonStatusCode: string = 'Created';
    constructor({ message, metadata }: IBaseResponse<T>) {
        super({ message, metadata });
    }
}