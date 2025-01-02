import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { ClashV1Service } from './clash_v1.service';

@Controller('ClashV1')
@ApiTags('ClashV1')
export class ClashV1Controller {
  constructor(private readonly ClashV1Service: ClashV1Service) {}
  @Get(':clash-v1')
  @ApiOperation({ summary: 'Check clash v1' })
  async getAllChampion(@Query('platform') platform: string) {
    if (!platform) {
      throw new Error('Platform is required!');
    }
    const results = await this.ClashV1Service.getAll(platform);

    return new CoreRes.OK({
      message: 'Lấy tất cả clash v1 thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
