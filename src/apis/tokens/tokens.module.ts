import { forwardRef, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './token.schema';
import { AuthModule } from '../Auth/auth.module';
import { User, UserSchema } from '../Users/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [TokensController],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
