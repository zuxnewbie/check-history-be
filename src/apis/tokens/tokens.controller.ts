import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TokensService } from './tokens.service';
import { CONST_API_COMMON_FEATURES } from 'src/constants';

@Controller(CONST_API_COMMON_FEATURES.TOKENS)
@ApiTags('Token apis')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  // @Post()
  // @ApiOperation({ summary: 'Tạo token' })
  // create(@Body() createTokenDto: CreateTokenDto) {
  //   return this.tokensService.create(createTokenDto);
  // }

  // @Get()
  // @ApiOperation({ summary: 'Lấy tất cả token' })
  // findAll() {
  //   return this.tokensService.findAll();
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Tìm kiếm token bằng ID' })
  // findOneById(@Param('id') id: string) {
  //   return this.tokensService.findOne(+id);
  // }

  // @Get(`${CONST_APIS.CONST_API_COMMON_FEATURES.USERS}/:id`)
  // @ApiOperation({ summary: 'Tìm kiếm token bằng ID' })
  // findOneByUserId(@Param('id') id: string) {
  //   return this.tokensService.findOne(+id);
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Cập nhật token' })
  // update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
  //   return this.tokensService.update(+id, updateTokenDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Xóa vĩnh viễn token' })
  // remove(@Param('id') id: string) {
  //   return this.tokensService.remove(+id);
  // }
}
