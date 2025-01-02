import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { APP_GUARD } from '@nestjs/core';
// import { ThrottlerGuard } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChampionV3Module } from './apis/Champion-V3/champion_v3.module';
import { AccountV1Module } from './apis/Account-V1/account_v1.module';
import { AuthModule } from './apis/Auth/auth.module';
import { ChampionMasteryV4Module } from './apis/Champion-Mastery-V4/champion_mastery_v4.module';
import { ClashV1Module } from './apis/Clash-V1/clash_v1.module';
import { LeagueExpV4Module } from './apis/League-Exp-V4/league_exp_v4.module';
import { LeagueV4Module } from './apis/League-V4/league_v4.module';
import { LoLChallengesV1Module } from './apis/LoL-Challenges-V1/lol_challenges_v1.module';
import { LoLStatusV4Module } from './apis/LoL-Status-V4/lol_status_v4.module';
import { MatchV5Module } from './apis/Match-V5/match_v5.module';
import { SpectatorV5Module } from './apis/Spectator-V5/spectator_v5.module';
import { SummonerV4Module } from './apis/Summoner-V4/summoner_v4.module';
import { TournamentStubV5Module } from './apis/Tournament-Stub-V5/tournament_stub_v5.module';
import { UsersModule } from './apis/Users/users.module';
import { TokenEntity, TokenSchema } from './apis/tokens/token.entity';
import { UserEntity, UserSchema } from './apis/Users/user.entity';
import { UsersController } from './apis/Users/users.controller';
import { TokensController } from './apis/tokens/tokens.controller';
import { UsersService } from './apis/Users/users.service';
import { TokensService } from './apis/tokens/tokens.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: TokenEntity.name, schema: TokenSchema },
      { name: UserEntity.name, schema: UserSchema },
    ]),
    ChampionV3Module,
    AccountV1Module,
    AuthModule,
    ChampionMasteryV4Module,
    ClashV1Module,
    LeagueExpV4Module,
    LeagueV4Module,
    LoLChallengesV1Module,
    LoLStatusV4Module,
    MatchV5Module,
    SpectatorV5Module,
    SummonerV4Module,
    TournamentStubV5Module,
    UsersModule,
  ],
  controllers: [AppController, UsersController, TokensController],
  providers: [
    AppService,
    UsersService,
    TokensService,
    // {
    //   provide: APP_GUARD,
    //   // useClass: ThrottlerGuard,
    // },
  ],
  exports: [AppService],
})
export class AppModule {}
