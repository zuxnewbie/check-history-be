import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { SpectatorV5Service } from './spectator_v5.service';

@Controller('SpectatorV5')
@ApiTags('SpectatorV5')
export class SpectatorV5Controller {
  constructor(private readonly SpectatorV5Service: SpectatorV5Service) {}
  @Get('spectator-v5-spectator')
  @ApiOperation({ summary: 'Get current game information for the given puuid' })
  async getSpectator(
    @Query('region') region: string,
    @Query('encryptedPUUID') encryptedPUUID: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.SpectatorV5Service.getSpectator(
      region,
      encryptedPUUID,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('spectator-v5-spectator-list')
  @ApiOperation({ summary: 'Get list of featured games' })
  async getListFeaturedGame(@Query('region') region: string) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.SpectatorV5Service.getListFeaturedGame(region);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
