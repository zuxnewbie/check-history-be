import { Global, Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
