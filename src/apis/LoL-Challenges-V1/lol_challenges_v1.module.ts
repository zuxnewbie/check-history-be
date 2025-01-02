import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoLChallengesV1Controller } from './lol_challenges_v1.controller';
import { LoLChallengesV1Service } from './lol_challenges_v1.service';

@Module({
  imports: [HttpModule],
  providers: [LoLChallengesV1Service],
  controllers: [LoLChallengesV1Controller],
  exports: [LoLChallengesV1Service],
})
export class LoLChallengesV1Module {}
