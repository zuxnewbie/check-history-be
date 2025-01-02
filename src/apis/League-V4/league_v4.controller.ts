import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { LeagueV4Service } from './league_v4.service';

@Controller('LeagueV4')
@ApiTags('LeagueV4')
export class LeagueV4Controller {
  constructor(private readonly LeagueV4Service: LeagueV4Service) {}
  @Get(':league-v4')
  @ApiOperation({ summary: 'Check league-v4' })
  async getAllChampion(@Query('platform') platform: string) {
    if (!platform) {
      throw new Error('Platform is required!');
    }
    const results = await this.LeagueV4Service.getAll(platform);

    return new CoreRes.OK({
      message: 'Lấy tất cả league-v4 thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
