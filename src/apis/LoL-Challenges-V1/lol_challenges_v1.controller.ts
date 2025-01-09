import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { LoLChallengesV1Service } from './lol_challenges_v1.service';

@Controller('LoLChallengesV1')
@ApiTags('LoLChallengesV1')
export class LoLChallengesV1Controller {
  constructor(
    private readonly LoLChallengesV1Service: LoLChallengesV1Service,
  ) {}
  @Get('lol-challenges-v1-config')
  @ApiOperation({
    summary:
      'List of all basic challenge configuration information (includes all translations for names and descriptions',
  })
  async getConfig(@Query('region') region: string) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LoLChallengesV1Service.getConfig(region);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('lol-challenges-v1-percentiles')
  @ApiOperation({
    summary:
      'Map of level to percentile of players who have achieved it - keys: ChallengeId -> Season -> Level -> percentile of players who achieved it',
  })
  async getPercentiles(@Query('region') region: string) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LoLChallengesV1Service.getPercentiles(region);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('lol-challenges-v1-challenge-config')
  @ApiOperation({ summary: 'Get challenge configuration (REST)' })
  async getChallengeConfig(
    @Query('region') region: string,
    @Query('challengeId') challengeId: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LoLChallengesV1Service.getChallengeConfig(
      region,
      challengeId,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('lol-challenges-v1-leaderboard')
  @ApiOperation({
    summary:
      'Return top players for each level. Level must be MASTER, GRANDMASTER or CHALLENGER',
  })
  async getLeaderBoard(
    @Query('region') region: string,
    @Query('challengeId') challengeId: string,
    @Query('level') level: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LoLChallengesV1Service.getLeaderBoard(
      region,
      challengeId,
      level,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('lol-challenges-v1-map')
  @ApiOperation({
    summary: 'Map of level to percentile of players who have achieved it',
  })
  async getMap(
    @Query('region') region: string,
    @Query('challengeId') challengeId: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LoLChallengesV1Service.getMap(
      region,
      challengeId,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('lol-challenges-v1-player-data')
  @ApiOperation({
    summary:
      'Returns player information with list of all progressed challenges (REST)',
  })
  async getPlyerData(
    @Query('region') region: string,
    @Query('puuid') puuid: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LoLChallengesV1Service.getPlyerData(
      region,
      puuid,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
