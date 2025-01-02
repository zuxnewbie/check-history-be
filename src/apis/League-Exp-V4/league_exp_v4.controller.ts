import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { LeagueExpV4Service } from './league_exp_v4.service';

@Controller('LeagueExpV4')
@ApiTags('LeagueExpV4')
export class LeagueExpV4Controller {
  constructor(private readonly LeagueExpV4Service: LeagueExpV4Service) {}
  @Get(':league-exp-v4')
  @ApiOperation({ summary: 'Check league-exp-v4' })
  async getAllChampion(@Query('platform') platform: string) {
    if (!platform) {
      throw new Error('Platform is required!');
    }
    const results = await this.LeagueExpV4Service.getAll(platform);

    return new CoreRes.OK({
      message: 'Lấy tất cả league-exp-v4 thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
