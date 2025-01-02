import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { ChampionMasteryV4Service } from './champion_mastery_v4.service';

@Controller('ChampionMasteryV4')
@ApiTags('ChampionMasteryV4')
export class ChampionMasteryV4Controller {
  constructor(
    private readonly ChampionMasteryV4Service: ChampionMasteryV4Service,
  ) {}
  @Get(':champion-mastery-v4')
  @ApiOperation({ summary: 'Check mastery' })
  async getAllChampionMasteryV4(@Query('platform') platform: string) {
    if (!platform) {
      throw new Error('Platform is required!');
    }
    const results = await this.ChampionMasteryV4Service.getAll(platform);

    return new CoreRes.OK({
      message: 'Lấy tất cả mastery thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
