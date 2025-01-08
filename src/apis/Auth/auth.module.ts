import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from '../tokens/token.schema';
import { TokensModule } from '../tokens/tokens.module';
import { User, UserSchema } from '../Users/user.schema';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { LoginStrategy } from '@/guards/login.guard';
import { JwtAuthGuard } from '@/guards/register.guard';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    forwardRef(() => TokensModule),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRED'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LoginStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
