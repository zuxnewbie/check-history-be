import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChampionV3Service } from './champion_v3.service';
import { ChampionV3Controller } from './champion_v3.controller';

@Module({
  imports: [HttpModule],
  providers: [ChampionV3Service],
  controllers: [ChampionV3Controller],
  exports: [ChampionV3Service],
})
export class ChampionV3Module {}
