import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { MatchV5Service } from './match_v5.service';

@Controller('MatchV5')
@ApiTags('MatchV5')
export class MatchV5Controller {
  constructor(private readonly MatchV5Service: MatchV5Service) {}
  @Get('match-v5')
  @ApiOperation({ summary: '' })
  async getAllChampion(@Query('region') region: string) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.MatchV5Service.getAllChampion(region);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
