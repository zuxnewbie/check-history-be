import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TournamentStubV5Controller } from './tournament_stub_v5.controller';
import { TournamentStubV5Service } from './tournament_stub_v5.service';

@Module({
  imports: [HttpModule],
  providers: [TournamentStubV5Service],
  controllers: [TournamentStubV5Controller],
  exports: [TournamentStubV5Service],
})
export class TournamentStubV5Module {}
