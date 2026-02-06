import { Injectable } from '@nestjs/common';

import defaultLogger from './utils/default-logger';

// import { CustomException } from './exceptions/custom.exception';

@Injectable()
export class AppService {
  getHello(): string {
    try {
      // if() {
      //   throw CustomException.badRequest('This is a test error', 'TEST_ERROR');
      // }
      return 'Hello World!';
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      defaultLogger.error(`Error from AppService: ${errorMessage}`);
      throw error;
    }
  }
}
