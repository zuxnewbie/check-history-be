import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { SummonerV4Service } from './summoner_v4.service';

@Controller('SummonerV4')
@ApiTags('SummonerV4')
export class SummonerV4Controller {
  constructor(private readonly SummonerV4Service: SummonerV4Service) {}
  @Get(':summoner-v4')
  @ApiOperation({ summary: 'Check summoner-v4' })
  async getAllChampion(@Query('platform') platform: string) {
    if (!platform) {
      throw new Error('Platform is required!');
    }
    const results = await this.SummonerV4Service.getAll(platform);

    return new CoreRes.OK({
      message: 'Lấy tất cả summoner-v4 thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
