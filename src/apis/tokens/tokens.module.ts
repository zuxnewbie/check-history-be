import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenEntity, TokenSchema } from './token.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TokenEntity.name, schema: TokenSchema },
    ]),
  ],
  controllers: [TokensController],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
