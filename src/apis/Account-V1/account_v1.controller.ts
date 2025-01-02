import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountV1Service } from './account_v1.service';
import { CoreRes } from 'src/abstracts/common';

@Controller('AccountV1')
@ApiTags('AccountV1')
export class AccountV1Controller {
  constructor(private readonly AccountV1Service: AccountV1Service) {}
  @Get(':account-v1')
  @ApiOperation({ summary: 'Check Account' })
  async getAllAccountV1(@Query('platform') platform: string) {
    if (!platform) {
      throw new Error('Platform is required!');
    }
    const results = await this.AccountV1Service.getAllAccount(platform);

    return new CoreRes.OK({
      message: 'Lấy tất cả Account thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
