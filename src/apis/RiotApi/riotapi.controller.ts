import { BadRequestException, Body, Controller, Get, Query } from '@nestjs/common';
import { RiotApiService } from './riotapi.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';

@Controller('summoner')
@ApiTags('Test API')
export class SummonerController {
  constructor(private readonly riotApiService: RiotApiService) {}
  @Get(':champ')
  @ApiOperation({ summary: 'Check champion' })
  async watchChamp(@Query('platform') platform: string) {
    if (!platform) {
      throw new Error('Platform is required!');
    }
    this.riotApiService.getSummonerByName(platform);

    return ({
      // return new CoreRes.OK({
      message: 'Tạo phiên xác thực OTP thành công',
    });
  }
}
