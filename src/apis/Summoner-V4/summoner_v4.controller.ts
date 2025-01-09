import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { SummonerV4Service } from './summoner_v4.service';

@Controller('SummonerV4')
@ApiTags('SummonerV4')
export class SummonerV4Controller {
  constructor(private readonly SummonerV4Service: SummonerV4Service) {}
  @Get('summoner-v4')
  @ApiOperation({ summary: '' })
  async getAllChampion(@Query('region') region: string) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.SummonerV4Service.getAllChampion(region);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
