import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RiotApiService } from './riotapi.service';
import { SummonerController } from './riotapi.controller';

@Module({
  imports: [HttpModule],
  providers: [RiotApiService],
  controllers: [SummonerController],
  exports: [RiotApiService],
})
export class TestModule { }
