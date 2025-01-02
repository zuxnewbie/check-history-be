import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChampionMasteryV4Controller } from './champion_mastery_v4.controller';
import { ChampionMasteryV4Service } from './champion_mastery_v4.service';

@Module({
  imports: [HttpModule],
  providers: [ChampionMasteryV4Service],
  controllers: [ChampionMasteryV4Controller],
  exports: [ChampionMasteryV4Service],
})
export class ChampionMasteryV4Module {}
