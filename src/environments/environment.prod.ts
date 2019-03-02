import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logging: {
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel:NgxLoggerLevel.ERROR,
    serverLoggingUrl: 'https://aviatel.free.beeceptor.com/logs'
  }
};
