import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClashV1Service } from './clash_v1.service';
import { ClashV1Controller } from './clash_v1.controller';

@Module({
  imports: [HttpModule],
  providers: [ClashV1Service],
  controllers: [ClashV1Controller],
  exports: [ClashV1Service],
})
export class ClashV1Module {}
