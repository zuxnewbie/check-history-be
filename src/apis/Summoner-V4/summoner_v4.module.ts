import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SummonerV4Controller } from './summoner_v4.controller';
import { SummonerV4Service } from './summoner_v4.service';

@Module({
  imports: [HttpModule],
  providers: [SummonerV4Service],
  controllers: [SummonerV4Controller],
  exports: [SummonerV4Service],
})
export class SummonerV4Module {}
