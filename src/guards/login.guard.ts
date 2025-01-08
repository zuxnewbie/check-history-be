import { Strategy } from 'passport-local';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@/apis/Auth/auth.service';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(user_email: string, user_pass: string): Promise<any> {
    const user = await this.authService.validateUser(user_email, user_pass);
    if (!user) {
      throw new UnauthorizedException('email/Password không hợp lệ.');
    }
    if (user.isActive === false) {
      throw new BadRequestException('Tài khoản chưa được kích hoạt');
    }
    return user;
  }
}

@Injectable()
export class LoginAuthGuard extends AuthGuard('local') {}
