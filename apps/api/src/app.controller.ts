import { Controller, Get, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TEST_VARIABLE } from '@appName/core';

@Controller()
export class AppController {
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService
  ) {}

  @Get('debug')
  getDebug() {
    const debugPayload = {
      ENV: this.configService.get('ENV'),
      API_BASEPATH: this.configService.get('API_BASEPATH'),
      DEBUG: this.configService.get('DEBUG'),
      TEST_VARIABLE
    };

    this.logger.log(debugPayload);

    return debugPayload;
  }
}
