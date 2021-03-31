//lecture 5.1 implementing the jwt strtegy
import {PassportStrategy} from '@nestjs/passport';
import {Strategy,ExtractJwt} from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable() // so that it can be injected
export class JwtStrategy extends  PassportStrategy(Strategy){
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //retriece jwt token from the request, here we define how
      secretOrKey: 'topSecret51',  //the secret that passport is going to use to verify the signature of the token that is extracted from the request
    });
  }
 async validate(payload:JwtPayloadInterface): Promise<User>{
     // do some validation, whatever is returned from here is going to be injected into the request of any operation that is guarded with protection
   const {username} = payload;
   const user = await this.userRepository.findOne({username});

   if (!user){
     throw new UnauthorizedException();
   }
   return user;
 }

}
