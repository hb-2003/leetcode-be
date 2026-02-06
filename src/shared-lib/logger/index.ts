/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Context } from 'vm';

import * as winston from 'winston';

import { config } from '../../config/config';

const { format, transports } = winston;

const defaultLoggerConfig: winston.LoggerOptions = {
  level: config.app.nodeEnv === 'development' ? 'debug' : 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
};

const loggerObj = winston.createLogger(defaultLoggerConfig);

class Logger {
  service: string;
  constructor(service: string) {
    this.service = service;
  }

  log(message: string, ctx: Context, level: 'info' | 'error' | 'debug' = 'info') {
    loggerObj
      .child({
        requestId: ctx.requestId,
        reqIp: ctx.reqIp,
        userId: ctx.userId,
        clientName: ctx.clientName,
        service: this.service,
      })
      [level](message);
  }

  info(message: string, ctx: Context = {}) {
    this.log(message, ctx, 'info');
  }

  error(message: string, ctx: Context = {}) {
    this.log(message, ctx, 'error');
  }

  debug(message: string, ctx: Context = {}) {
    this.log(message, ctx, 'debug');
  }
}

export default Logger;
