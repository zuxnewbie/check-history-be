import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { LeagueExpV4Service } from './league_exp_v4.service';

@Controller('LeagueExpV4')
@ApiTags('LeagueExpV4')
export class LeagueExpV4Controller {
  constructor(private readonly LeagueExpV4Service: LeagueExpV4Service) {}
  @Get('league-exp-v4')
  @ApiOperation({ summary: 'Get all the league entries' })
  async getLeagueExp(
    @Query('region') region: string,
    @Query('queue') queue: string,
    @Query('tier') tier: string,
    @Query('division') division: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LeagueExpV4Service.getLeagueExp(
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
}
