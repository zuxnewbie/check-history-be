import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountV1Service } from './account_v1.service';
import { CoreRes } from 'src/abstracts/common';

@Controller('AccountV1')
@ApiTags('AccountV1')
export class AccountV1Controller {
  constructor(private readonly AccountV1Service: AccountV1Service) {}
  @Get('account-v1')
  @ApiOperation({ summary: 'Check Account' })
  async getAccountByPuuid(
    @Query('platform') region: string,
    @Query('puuid') puuid: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.AccountV1Service.getAccountByPuuid(
      region,
      puuid,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả Account thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('account-v1-by-riot-id')
  @ApiOperation({ summary: 'Check Account' })
  async getAccountByRiotID(
    @Query('region') region: string,
    @Query('gameName') gameName: string,
    @Query('tagLine') tagLine: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.AccountV1Service.getAccountByRiotID(
      region,
      gameName,
      tagLine,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả AccountByRiotId thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
