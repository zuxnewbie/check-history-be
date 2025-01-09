import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { LeagueV4Service } from './league_v4.service';

@Controller('LeagueV4')
@ApiTags('LeagueV4')
export class LeagueV4Controller {
  constructor(private readonly LeagueV4Service: LeagueV4Service) {}
  @Get('league-v4-challenger')
  @ApiOperation({ summary: 'Get the challenger league for given queue' })
  async getLeagueChallenger(
    @Query('region') region: string,
    @Query('queue') queue: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LeagueV4Service.getLeagueChallenger(
      region,
      queue,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('league-v4-entries-by-summonerId')
  @ApiOperation({
    summary: 'Get league entries in all queues for a given summoner ID',
  })
  async getLeagueEntriesBySummonerId(
    @Query('region') region: string,
    @Query('encryptedSummonerId') encryptedSummonerId: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LeagueV4Service.getLeagueEntriesBySummonerId(
      region,
      encryptedSummonerId,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('league-v4-all-entries')
  @ApiOperation({ summary: 'Get all the league entries.' })
  async getLeagueAllEntries(
    @Query('region') region: string,
    @Query('queue') queue: string,
    @Query('tier') tier: string,
    @Query('division') division: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LeagueV4Service.getLeagueAllEntries(
      region,
      queue,
      tier,
      division,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('league-v4-grandmaster')
  @ApiOperation({ summary: 'Get the grandmaster league of a specific queue' })
  async getLeagueGrandmaster(
    @Query('region') region: string,
    @Query('queue') queue: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LeagueV4Service.getLeagueGrandmaster(
      region,
      queue,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('league-v4-byId')
  @ApiOperation({
    summary: 'Get league with given ID, including inactive entries',
  })
  async getLeagueByID(
    @Query('region') region: string,
    @Query('leagueId') leagueId: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LeagueV4Service.getLeagueByID(region, leagueId);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('league-v4-master')
  @ApiOperation({ summary: 'Get the master league for given queue' })
  async getLeagueMaster(
    @Query('region') region: string,
    @Query('queue') queue: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LeagueV4Service.getLeagueMaster(region, queue);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
