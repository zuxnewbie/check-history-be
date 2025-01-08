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
import { Token, TokenSchema } from './apis/tokens/token.schema';
import { User, UserSchema } from './apis/Users/user.schema';
import { UsersController } from './apis/Users/users.controller';
import { TokensController } from './apis/tokens/tokens.controller';
import { UsersService } from './apis/Users/users.service';
import { TokensService } from './apis/tokens/tokens.service';
import { JwtService } from '@nestjs/jwt';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { LoginAuthGuard, LoginStrategy } from './guards/login.guard';

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
      { name: Token.name, schema: TokenSchema },
      { name: User.name, schema: UserSchema },
    ]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          // ignoreTLS: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        // preview: true,
        template: {
          dir: process.cwd() + '/src/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
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
    JwtService,
    LoginStrategy,
    LoginAuthGuard,
    // {
    //   provide: APP_GUARD,
    //   // useClass: ThrottlerGuard,
    // },
  ],
  exports: [AppService],
})
export class AppModule {}
