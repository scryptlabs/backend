import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../tasks/tasks.repository';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

//note that because we are exporting jwtmodule here, this module exports a provider called jwtservice which we can use to sign the tokens etc in the service
@Module({
  imports:[TypeOrmModule.forFeature([UserRepository]),
  JwtModule.register( //JWT module
    {
      secret: 'topSecret51',  // set up our secret
      signOptions: {
        expiresIn: 3600,  //set up how long the JTW session is valid for
      }
    }
  ),
  PassportModule.register({defaultStrategy:'jwt'})] //use the default strategy -- lecture 5.8
  ,
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[JwtStrategy,PassportModule],
})
export class AuthModule {}
