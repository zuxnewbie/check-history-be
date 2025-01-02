import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LeagueExpV4Controller } from './league_exp_v4.controller';
import { LeagueExpV4Service } from './league_exp_v4.service';

@Module({
  imports: [HttpModule],
  providers: [LeagueExpV4Service],
  controllers: [LeagueExpV4Controller],
  exports: [LeagueExpV4Service],
})
export class LeagueExpV4Module {}
