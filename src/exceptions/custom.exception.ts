import { HttpException, HttpStatus } from '@nestjs/common';

export interface CustomExceptionOptions {
  message?: string;
  code?: string;
  status?: HttpStatus;
  details?: unknown;
}

export class CustomException extends HttpException {
  public readonly code: string;
  public readonly details?: unknown;

  constructor(options: CustomExceptionOptions) {
    const {
      message = 'An error occurred',
      code = 'CUSTOM_ERROR',
      status = HttpStatus.INTERNAL_SERVER_ERROR,
      details = null,
    } = options;

    super(
      {
        message,
        code,
        details,
        status,
      },
      status,
    );

    this.code = code;
    this.details = details;
  }

  static badRequest(message: string, code?: string, details?: unknown): CustomException {
    return new CustomException({
      message,
      code: code || 'BAD_REQUEST',
      status: HttpStatus.BAD_REQUEST,
      details,
    });
  }

  static unauthorized(message: string, code?: string, details?: unknown): CustomException {
    return new CustomException({
      message,
      code: code || 'UNAUTHORIZED',
      status: HttpStatus.UNAUTHORIZED,
      details,
    });
  }

  static forbidden(message: string, code?: string, details?: unknown): CustomException {
    return new CustomException({
      message,
      code: code || 'FORBIDDEN',
      status: HttpStatus.FORBIDDEN,
      details,
    });
  }

  static notFound(message: string, code?: string, details?: unknown): CustomException {
    return new CustomException({
      message,
      code: code || 'NOT_FOUND',
      status: HttpStatus.NOT_FOUND,
      details,
    });
  }

  static conflict(message: string, code?: string, details?: unknown): CustomException {
    return new CustomException({
      message,
      code: code || 'CONFLICT',
      status: HttpStatus.CONFLICT,
      details,
    });
  }

  static internal(message: string, code?: string, details?: unknown): CustomException {
    return new CustomException({
      message,
      code: code || 'INTERNAL_ERROR',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      details,
    });
  }
}
