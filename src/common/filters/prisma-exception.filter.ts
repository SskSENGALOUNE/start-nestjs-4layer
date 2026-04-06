import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();

        switch (exception.code) {
            case 'P2002':  // ข้อมูลซ้ำ
                response.status(HttpStatus.CONFLICT).json({
                    statusCode: 409,
                    message: 'Already exists',
                });
                break;

            case 'P2025':  // หาไม่เจอ
                response.status(HttpStatus.NOT_FOUND).json({
                    statusCode: 404,
                    message: 'Not Found',
                });
                break;

            default:
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: 500,
                    message: 'เกิดข้อผิดพลาด',
                });
        }
    }
}