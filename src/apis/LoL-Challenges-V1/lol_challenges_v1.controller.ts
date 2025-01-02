import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { LoLChallengesV1Service } from './lol_challenges_v1.service';

@Controller('LoLChallengesV1')
@ApiTags('LoLChallengesV1')
export class LoLChallengesV1Controller {
  constructor(
    private readonly LoLChallengesV1Service: LoLChallengesV1Service,
  ) {}
  @Get(':lol-challenges-v1')
  @ApiOperation({ summary: 'Check lol-challenges-v1' })
  async getAllChampion(@Query('platform') platform: string) {
    if (!platform) {
      throw new Error('Platform is required!');
    }
    const results = await this.LoLChallengesV1Service.getAll(platform);

    return new CoreRes.OK({
      message: 'Lấy tất cả lol-challenges-v1 thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
