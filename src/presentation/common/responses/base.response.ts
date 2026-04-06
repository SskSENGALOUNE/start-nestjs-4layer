import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  data?: T;

  @ApiProperty({ required: false })
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    [key: string]: any;
  };

  @ApiProperty({ required: false })
  error?: {
    code: string;
    message: string;
  };

  constructor(partial: Partial<BaseResponse<T>>) {
    Object.assign(this, partial);
  }

  static ok<T>(data: T, message: string = 'Success'): BaseResponse<T> {
    return new BaseResponse<T>({
      success: true,
      message,
      data,
    });
  }

  static error(code: string, message: string): BaseResponse<null> {
    return new BaseResponse<null>({
      success: false,
      message,
      error: { code, message },
    });
  }
}                       