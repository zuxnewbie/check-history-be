import { Req, Post, Body, Get, Res, Controller } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IResponseLogin } from 'src/interfaces/common';
import { UtilCookie } from 'src/utils';
import { CONST_API_AUTH, CONST_VAL } from 'src/constants';
import { CoreRes } from 'src/abstracts/common';
// import { CreateCustomerDto } from '../customers/customer.dto';

@Controller()
@ApiTags('Auth apis --- Test')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(CONST_API_AUTH.LOGIN)
  @ApiOperation({ summary: 'Đăng nhập' })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const dataLogin: IResponseLogin = await this.authService.login(loginDto);

    return UtilCookie.setCookieToken({
      res,
      name: CONST_VAL.TOKEN_NAME,
      data: dataLogin.token,
    }).send(
      new CoreRes.OK({
        message: 'Đăng nhập thành công',
        metadata: dataLogin,
      }),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Đăng xuất' })
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.authService.logout(req);

    return UtilCookie.clearCookie({ name: CONST_VAL.TOKEN_NAME, res }).send(
      new CoreRes.OK({ message: 'Đăng xuất thành công' }),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Lấy thông tin cá nhân' })
  async getMe(@Req() req: Request) {
    const me = await this.authService.getMe(req);

    return new CoreRes.OK({
      message: 'Lấy thông tin cá nhân thành công',
      metadata: me,
    });
  }
}
