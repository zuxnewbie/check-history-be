import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { ClashV1Service } from './clash_v1.service';

@Controller('ClashV1')
@ApiTags('ClashV1')
export class ClashV1Controller {
  constructor(private readonly ClashV1Service: ClashV1Service) {}
  @Get('clash-v1')
  @ApiOperation({ summary: 'Get players by puuid' })
  async getPlayer(
    @Query('region') region: string,
    @Query('puuid') puuid: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.ClashV1Service.getPlayer(region, puuid);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('clash-v1-by-summoner')
  @ApiOperation({ summary: 'Get players by summoner ID' })
  async getPlayerBySummoner(
    @Query('region') region: string,
    @Query('summonerId') summonerId: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.ClashV1Service.getPlayerBySummoner(
      region,
      summonerId,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('clash-v1-by-team')
  @ApiOperation({ summary: 'Get team by ID.' })
  async getTeam(
    @Query('region') region: string,
    @Query('teamId') teamId: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.ClashV1Service.getTeam(region, teamId);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('clash-v1-tournaments')
  @ApiOperation({ summary: 'Get all active or upcoming tournaments' })
  async getTournaments(@Query('region') region: string) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.ClashV1Service.getTournaments(region);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('clash-v1-tournaments-by-team')
  @ApiOperation({ summary: 'Get tournament by team ID' })
  async getTournamentsByTeam(
    @Query('region') region: string,
    @Query('teamId') teamId: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.ClashV1Service.getTournamentsByTeam(
      region,
      teamId,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('clash-v1-tournaments-by-id')
  @ApiOperation({ summary: 'Get tournament by ID' })
  async getTournamentsById(
    @Query('region') region: string,
    @Query('tournamentId') tournamentId: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.ClashV1Service.getTournamentsById(
      region,
      tournamentId,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
