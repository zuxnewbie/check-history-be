import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { TournamentStubV5Service } from './tournament_stub_v5.service';

@Controller('TournamentStubV5')
@ApiTags('TournamentStubV5')
export class TournamentStubV5Controller {
  constructor(
    private readonly TournamentStubV5Service: TournamentStubV5Service,
  ) {}
  @Get('tournament-v5')
  @ApiOperation({ summary: '' })
  async getAllChampion(@Query('region') region: string) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.TournamentStubV5Service.getAllChampion(region);

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
