import {
  Req,
  Post,
  Body,
  Get,
  Res,
  Controller,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ChangePasswordAuthDto, CodeAuthDto, RegisterDto } from './auth.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UtilCookie } from 'src/utils';
import { CONST_API_AUTH, CONST_VAL } from 'src/constants';
import { CoreRes } from 'src/abstracts/common';
import { MailerService } from '@nestjs-modules/mailer';
import { LoginAuthGuard } from '@/guards/login.guard';
// import { AuthGuard } from '@/guards/auth.guard';
// import { CreateCustomerDto } from '../customers/customer.dto';

@Controller()
@ApiTags('Auth apis --- Test')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @Post(CONST_API_AUTH.LOGIN)
  @UseGuards(LoginAuthGuard)
  @ApiOperation({ summary: 'Đăng nhập' })
  async login(@Req() req: Request) {
    console.log('Login request user:', req);
    // const dataLogin: any = await this.authService.login(req);
    // console.log('dataLogin', dataLogin);
    // return UtilCookie.setCookieToken({
    //   res,
    //   name: CONST_VAL.TOKEN_NAME,
    //   data: dataLogin.token,
    // }).send(
    //   new CoreRes.OK({
    //     message: 'Đăng nhập thành công',
    //     metadata: dataLogin,
    //   }),
    // );
    return new CoreRes.OK({
      message: 'Đăng nhập thành công',
      // metadata: dataLogin,
    });
  }

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký' })
  async register(@Body() registerDto: RegisterDto) {
    console.log('protected');

    await this.authService.register(registerDto);
    return new CoreRes.OK({
      message: 'Đăng ký thành công',
      // metadata: result,
    });
  }

  @Post('check-code')
  @ApiOperation({ summary: 'active tài khoảng với code' })
  async checkCode(@Body() registerDto: CodeAuthDto) {
    await this.authService.checkCode(registerDto);
    return new CoreRes.OK({
      message: 'Đã gửi mã code',
    });
  }

  @Post('retry-active')
  @ApiOperation({ summary: 'gửi lại mã code' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user_email: { type: 'string' },
      },
    },
  })
  async retryActive(@Body('user_email') email: string) {
    await this.authService.retryActive(email);
    return new CoreRes.OK({
      message: 'Đã gửi mã đăng nhập',
    });
  }

  @Post('retry-password')
  @ApiOperation({ summary: 'Gửi lại mật khẩu' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user_email: { type: 'string' },
      },
    },
  })
  async retryPassword(@Body('user_email') email: string) {
    await this.authService.retryPassword(email);
    return new CoreRes.OK({
      message: 'Đã gửi lại mật khẩu',
    });
  }

  @Post('change-password')
  @ApiOperation({ summary: 'Thay đổi mật khẩu' })
  async changePassword(@Body() data: ChangePasswordAuthDto) {
    await this.authService.changePassword(data);
    return new CoreRes.OK({
      message: 'Đổi mật khẩu thành công',
    });
  }

  @Get('mail')
  @ApiOperation({ summary: 'Gửi mail --- test' })
  async testMail() {
    await this.mailerService.sendMail({
      to: 'tocchienofvu@gmail.com', // list of receivers
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>hello world with vu vu</b>', // HTML body content
      template: 'register',
      context: {
        name: 'tocchienofvu',
        activationCode: 123456,
      },
    });
    return new CoreRes.OK({
      message: 'Gửi mail thành công',
    });
  }

  @Post()
  @ApiOperation({ summary: 'Đăng xuất' })
  async logout(@Req() req: Request, @Res() res: Response) {
    // await this.authService.logout(req);

    return UtilCookie.clearCookie({ name: CONST_VAL.TOKEN_NAME, res }).send(
      new CoreRes.OK({ message: 'Đăng xuất thành công' }),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Lấy thông tin cá nhân' })
  async getMe() {
    // const me = await this.authService.getMe(req);

    return new CoreRes.OK({
      message: 'Lấy thông tin cá nhân thành công',
      // metadata: me,
    });
  }
}
