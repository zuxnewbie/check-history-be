import { Controller, Get, Query } from '@nestjs/common';
import { ChampionV3Service } from './champion_v3.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('summoner')
@ApiTags('Test API')
export class SummonerController {
  constructor(private readonly ChampionV3Service: ChampionV3Service) {}
  @Get(':champ')
  @ApiOperation({ summary: 'Check champion' })
  async watchChamp(@Query('platform') platform: string) {
    if (!platform) {
      throw new Error('Platform is required!');
    }
    this.ChampionV3Service.getChampion(platform);

    return {
      // return new CoreRes.OK({
      message: 'Tạo phiên xác thực OTP thành công',
    };
  }
}
