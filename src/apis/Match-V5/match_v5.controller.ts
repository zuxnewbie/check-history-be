import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { MatchV5Service } from './match_v5.service';

@Controller('MatchV5')
@ApiTags('MatchV5')
export class MatchV5Controller {
  constructor(private readonly MatchV5Service: MatchV5Service) {}
  @Get('match-v5-puuid')
  @ApiOperation({ summary: 'Get a list of match ids by puuid' })
  async getMatchByPuuid(
    @Query('region') region: string,
    @Query('puuid') puuid: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.MatchV5Service.getMatchByPuuid(region, puuid);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('match-v5-matchId')
  @ApiOperation({ summary: 'Get a match by match id' })
  async getMatchByMatchId(
    @Query('region') region: string,
    @Query('matchId') matchId: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.MatchV5Service.getMatchByMatchId(
      region,
      matchId,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('match-v5-timeline')
  @ApiOperation({ summary: 'Get a match timeline by match id' })
  async getMatchTimeLine(
    @Query('region') region: string,
    @Query('matchId') matchId: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.MatchV5Service.getMatchTimeLine(region, matchId);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
