import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IErrorResponse } from 'src/interfaces/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const responseErr =
      exception.getResponse() as IErrorResponse;
    let errMessage: string;

    if (typeof responseErr.message === 'object' && responseErr.message) {
      errMessage = responseErr.message[0];
    } else {
      errMessage = responseErr.message;
    }

    const resultError: IErrorResponse = {
      statusCode: responseErr.statusCode || 500,
      error: responseErr.error,
      message: errMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(responseErr.statusCode).json(resultError);
  }
}
