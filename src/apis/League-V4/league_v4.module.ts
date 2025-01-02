import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LeagueV4Controller } from './league_v4.controller';
import { LeagueV4Service } from './league_v4.service';

@Module({
  imports: [HttpModule],
  providers: [LeagueV4Service],
  controllers: [LeagueV4Controller],
  exports: [LeagueV4Service],
})
export class LeagueV4Module {}
