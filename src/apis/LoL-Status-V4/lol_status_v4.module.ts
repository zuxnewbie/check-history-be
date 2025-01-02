import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoLStatusV4Controller } from './lol_status_v4.controller';
import { LoLStatusV4Service } from './lol_status_v4.service';

@Module({
  imports: [HttpModule],
  providers: [LoLStatusV4Service],
  controllers: [LoLStatusV4Controller],
  exports: [LoLStatusV4Service],
})
export class LoLStatusV4Module {}
