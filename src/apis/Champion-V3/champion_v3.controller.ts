import { Controller, Get, Query } from '@nestjs/common';
import { ChampionV3Service } from './champion_v3.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';

@Controller('Champion V3')
@ApiTags('Champion V3')
export class ChampionV3Controller {
  constructor(private readonly ChampionV3Service: ChampionV3Service) {}
  @Get('champion-v3')
  @ApiOperation({
    summary:
      'Trả lại vòng quay vô địch, bao gồm vòng quay miễn phí và vòng quay miễn phí cấp thấp (REST)',
  })
  async getAllChampion(@Query('region') region: string) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.ChampionV3Service.getChampionRotations(region);

    return new CoreRes.OK({
      message: 'Lấy tất cả Champion v3 thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
