import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MatchV5Controller } from './match_v5.controller';
import { MatchV5Service } from './match_v5.service';

@Module({
  imports: [HttpModule],
  providers: [MatchV5Service],
  controllers: [MatchV5Controller],
  exports: [MatchV5Service],
})
export class MatchV5Module {}
