import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AccountV1Service } from './account_v1.service';
import { AccountV1Controller } from './account_v1.controller';

@Module({
  imports: [HttpModule],
  providers: [AccountV1Service],
  controllers: [AccountV1Controller],
  exports: [AccountV1Service],
})
export class AccountV1Module {}
