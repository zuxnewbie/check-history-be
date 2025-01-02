import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { SpectatorV5Service } from './spectator_v5.service';

@Controller('SpectatorV5')
@ApiTags('SpectatorV5')
export class SpectatorV5Controller {
  constructor(private readonly SpectatorV5Service: SpectatorV5Service) {}
  @Get(':spectator-v5')
  @ApiOperation({ summary: 'Check spectator-v5' })
  async getAllChampion(@Query('platform') platform: string) {
    if (!platform) {
      throw new Error('Platform is required!');
    }
    const results = await this.SpectatorV5Service.getAll(platform);

    return new CoreRes.OK({
      message: 'Lấy tất cả spectator-v5 thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
