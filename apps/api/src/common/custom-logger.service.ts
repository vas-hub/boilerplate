import { LoggerService } from '@nestjs/common';
import { format, utcToZonedTime } from 'date-fns-tz';

const formatString = (startCode: number, endCode: number) => (string: string) =>
  '\u001B[' + startCode + 'm' + string + '\u001B[' + endCode + 'm';

const Colors = {
  black: formatString(30, 39),
  red: formatString(31, 39),
  green: formatString(32, 39),
  yellow: formatString(33, 39),
  blue: formatString(34, 39),
  magenta: formatString(35, 39),
  cyan: formatString(36, 39),
  white: formatString(37, 39),
  gray: formatString(90, 39)
};

export default class CustomLogger implements LoggerService {
  private formatMessage(opts: {
    message: any;
    level: string;
    trace?: string;
  }): string {
    return `[${format(
      utcToZonedTime(new Date(), 'Europe/Rome'),
      'yyyy/LL/dd HH:mm:ss OOOO',
      { timeZone: 'Europe/Rome' }
    )}] (${opts.level}): ${JSON.stringify(opts.message)}${
      opts.trace ? `\n---- Details ----\n${opts.trace}` : ''
    }`;
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any) {
    console.log(Colors.green(this.formatMessage({ message, level: 'log' })));
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, trace?: string) {
    console.error(
      Colors.red(
        this.formatMessage({
          message,
          trace,
          level: 'error'
        })
      )
    );
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any) {
    console.log(Colors.yellow(this.formatMessage({ message, level: 'warn' })));
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any) {
    console.log(Colors.blue(this.formatMessage({ message, level: 'debug' })));
  }
}
