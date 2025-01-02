import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AQueries, CoreRes } from 'src/abstracts/common';
import { Request } from 'express';
import { CONST_API_COMMON, CONST_API_COMMON_FEATURES } from 'src/constants';

@Controller(CONST_API_COMMON_FEATURES.USERS)
@ApiTags('User apis --- Test')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo người dùng' })
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return new CoreRes.OK({
      message: 'Tạo người dùng thành công',
      metadata: newUser,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả người dùng' })
  async findAll(
    @Query()
    queries: AQueries,
  ) {
    const results = await this.usersService.findAll(queries);
    return new CoreRes.OK({
      message: 'Lấy tất cả người dùng thành công',
      metadata: results,
    });
  }

  // @Get(`${CONST_API_COMMON.SEARCH}`)
  // @ApiOperation({ summary: 'Tìm kiếm người dùng' })
  // async search(
  //   @Query()
  //   queries: AQueries,
  // ) {
  //   const results = await this.usersService.search(queries);
  //   return new CoreRes.OK({
  //     message: 'Tìm kiếm người dùng thành công',
  //     metadata: results,
  //   });
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Tìm kiếm người dùng bằng ID' })
  async findOneById(@Param('id') id: string) {
    const blogs = await this.usersService.findOneById(id);
    return new CoreRes.OK({
      message: 'Lấy thông tin người dùng thành công',
      metadata: blogs,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật người dùng' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userUpdated = await this.usersService.update(id, updateUserDto);
    if (!userUpdated) {
      throw new BadRequestException('Cập nhật người dùng thất bại');
    }

    return new CoreRes.OK({
      message: 'Cập nhật thông tin người dùng thành công',
    });
  }

  @Patch(`${CONST_API_COMMON.RESTORE}/:id`)
  @ApiOperation({ summary: 'Restore người dùng' })
  async restore(@Param('id') id: string) {
    const userRestored = await this.usersService.restore(id);
    if (!userRestored) {
      throw new BadRequestException('Restore người dùng thất bại');
    }

    return new CoreRes.OK({
      message: 'Restore người dùng thành công',
    });
  }

  @Delete(`${CONST_API_COMMON.SOFT_DELETE}/:id`)
  @ApiOperation({ summary: 'Xóa mềm người dùng' })
  async softRemoveById(@Req() req: Request, @Param('id') id: string) {
    const userSoftDeleted = await this.usersService.softRemove({ req, id });
    if (!userSoftDeleted) {
      throw new BadRequestException('Xóa tạm thời người dùng thất bại');
    }
    return new CoreRes.OK({
      message: 'Xóa tạm thời người dùng thành công',
    });
  }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Xóa vĩnh viễn người dùng' })
  // async removeById(@Param('id') id: string) {
  //   const userDeleted = await this.usersService.remove(id);
  //   if (!userDeleted) {
  //     throw new BadRequestException('Xóa người dùng thất bại');
  //   }
  //   return new CoreRes.OK({
  //     message: 'Xóa người dùng thành công',
  //   });
  // }
}
