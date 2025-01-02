import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { LoLStatusV4Service } from './lol_status_v4.service';

@Controller('LoLStatusV4')
@ApiTags('LoLStatusV4')
export class LoLStatusV4Controller {
  constructor(private readonly LoLStatusV4Service: LoLStatusV4Service) {}
  @Get(':lol-status-v4')
  @ApiOperation({ summary: 'Check lol-status-v4' })
  async getAllChampion(@Query('platform') platform: string) {
    if (!platform) {
      throw new Error('Platform is required!');
    }
    const results = await this.LoLStatusV4Service.getAll(platform);

    return new CoreRes.OK({
      message: 'Lấy tất cả lol-status-v4 thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
