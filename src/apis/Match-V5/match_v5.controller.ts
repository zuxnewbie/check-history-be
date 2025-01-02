import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { MatchV5Service } from './match_v5.service';

@Controller('MatchV5')
@ApiTags('MatchV5')
export class MatchV5Controller {
  constructor(private readonly MatchV5Service: MatchV5Service) {}
  @Get(':match-v5')
  @ApiOperation({ summary: 'Check match-v5' })
  async getAllChampion(@Query('platform') platform: string) {
    if (!platform) {
      throw new Error('Platform is required!');
    }
    const results = await this.MatchV5Service.getAll(platform);

    return new CoreRes.OK({
      message: 'Lấy tất cả match-v5 thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
