import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SpectatorV5Controller } from './spectator_v5.controller';
import { SpectatorV5Service } from './spectator_v5.service';

@Module({
  imports: [HttpModule],
  providers: [SpectatorV5Service],
  controllers: [SpectatorV5Controller],
  exports: [SpectatorV5Service],
})
export class SpectatorV5Module {}
