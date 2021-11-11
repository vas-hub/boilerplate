import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { TEST_VARIABLE } from '@appName/core';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get('debug')
  getDebug() {
    return {
      ENV: this.configService.get('ENV'),
      API_BASEPATH: this.configService.get('API_BASEPATH'),
      DEBUG: this.configService.get('DEBUG'),
      TEST_VARIABLE
    };
  }
}
