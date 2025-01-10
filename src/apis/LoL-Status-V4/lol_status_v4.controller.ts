import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { LoLStatusV4Service } from './lol_status_v4.service';

@Controller('LoLStatusV4')
@ApiTags('LoLStatusV4')
export class LoLStatusV4Controller {
  constructor(private readonly LoLStatusV4Service: LoLStatusV4Service) {}
  @Get('lol-status-v4')
  @ApiOperation({ summary: '' })
  async getStatus(@Query('region') region: string) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.LoLStatusV4Service.getStatus(region);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
