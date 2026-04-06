import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseResponse } from '../common/responses/base.response';

@Injectable()
export class BaseErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(BaseErrorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        // 1. HTTP Exception (NestJS built-in เช่น NotFoundException, UnauthorizedException)                 
        if (err instanceof HttpException) {
          const status = err.getStatus();
          const code = this.getCodeFromStatus(status);
          return throwError(() =>
            new HttpException(
              BaseResponse.error(code, err.message),
              status,
            ),
          );
        }

        // 2. Unexpected error — log แล้วคืน 500                                                                
        this.logger.error(err?.message, err?.stack);
        return throwError(() =>
          new HttpException(
            BaseResponse.error('INTERNAL_ERROR', 'Unexpected error'),
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      }),
    );
  }

  private getCodeFromStatus(status: number): string {
    const map: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'UNPROCESSABLE_ENTITY',
      429: 'TOO_MANY_REQUESTS',
      500: 'INTERNAL_ERROR',
    };
    return map[status] ?? 'UNKNOWN_ERROR';
  }
}                                                                                                           
