import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreRes } from 'src/abstracts/common';
import { ChampionMasteryV4Service } from './champion_mastery_v4.service';

@Controller('ChampionMasteryV4')
@ApiTags('ChampionMasteryV4')
export class ChampionMasteryV4Controller {
  constructor(
    private readonly ChampionMasteryV4Service: ChampionMasteryV4Service,
  ) {}
  @Get('champion-mastery-v4')
  @ApiOperation({
    summary:
      'Sắp xếp tất cả các mục nhập thành thạo tướng theo số điểm tướng giảm dần.',
  })
  async getAllChampionMasteryV4(
    @Query('region') region: string,
    @Query('region') encryptedPUUID: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.ChampionMasteryV4Service.getAll(
      region,
      encryptedPUUID,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả mastery thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('champion-mastery-v4-a-champion-mastery')
  @ApiOperation({
    summary: 'Nhận thông thạo tướng bằng puuid và ID tướng',
  })
  async getAChampionMastery(
    @Query('region') region: string,
    @Query('encryptedPUUID') encryptedPUUID: string,
    @Query('championId') championId: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.ChampionMasteryV4Service.getAChampionMastery(
      region,
      encryptedPUUID,
      championId,
    );

    return new CoreRes.OK({
      message:
        'Lấy tất cả Nhận thông thạo tướng bằng puuid và ID tướng thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('champion-mastery-v4-specified-number-of-top')
  @ApiOperation({
    summary:
      'Nhận số lượng mục nhập thành thạo tướng hàng đầu được sắp xếp theo số điểm tướng giảm dần.',
  })
  async getSpecifiedNumberOfTop(
    @Query('region') region: string,
    encryptedPUUID: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results = await this.ChampionMasteryV4Service.getSpecifiedNumberOfTop(
      region,
      encryptedPUUID,
    );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }

  @Get('champion-mastery-v4-player-total-champion-mastery-score')
  @ApiOperation({
    summary:
      'Nhận tổng điểm thành thạo tướng của người chơi, là tổng điểm thành thạo tướng của từng người chơi',
  })
  async getPlayerTotalChampionMasteryScore(
    @Query('region') region: string,
    encryptedPUUID: string,
  ) {
    if (!region) {
      throw new Error('region is required!');
    }
    const results =
      await this.ChampionMasteryV4Service.getPlayerTotalChampionMasteryScore(
        region,
        encryptedPUUID,
      );

    return new CoreRes.OK({
      message: 'Lấy tất cả thành công',
      statusCode: results.status,
      metadata: results,
    });
  }
}
