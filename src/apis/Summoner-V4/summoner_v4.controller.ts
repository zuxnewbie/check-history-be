import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { SummonerV4Service } from './summoner_v4.service';

@Controller('SummonerV4')
@ApiTags('SummonerV4')
export class SummonerV4Controller {
  constructor(private readonly SummonerV4Service: SummonerV4Service) {}
  @Get('summoner-v4-by-rso')
  @ApiOperation({ summary: 'Get a summoner by its RSO encrypted PUUID' })
  async getSummonerByRsoPuuid(
    @Query('region') region: string,
    @Query('rsoPUUID') rsoPUUID: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.SummonerV4Service.getSummonerByRsoPuuid(
      region,
      rsoPUUID,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('summoner-v4-by-account')
  @ApiOperation({ summary: 'Get a summoner by account ID' })
  async getSummonerByAccountId(
    @Query('region') region: string,
    @Query('encryptedAccountId') encryptedAccountId: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.SummonerV4Service.getSummonerByAccountId(
      region,
      encryptedAccountId,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('summoner-v4-by-puuid')
  @ApiOperation({ summary: 'Get a summoner by PUUID.' })
  async getSummonerByPuuid(
    @Query('region') region: string,
    @Query('encryptedPUUID') encryptedPUUID: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.SummonerV4Service.getSummonerByPuuid(
      region,
      encryptedPUUID,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('summoner-v4-me')
  @ApiOperation({ summary: 'Get a summoner by access token' })
  async getSummonerMe(@Query('region') region: string) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.SummonerV4Service.getSummonerMe(region);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('summoner-v4-summoner')
  @ApiOperation({ summary: 'Get a summoner by summoner ID' })
  async getSummonerId(
    @Query('region') region: string,
    @Query('encryptedSummonerId') encryptedSummonerId: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.SummonerV4Service.getSummonerId(
      region,
      encryptedSummonerId,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
