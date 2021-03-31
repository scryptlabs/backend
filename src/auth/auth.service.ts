import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('authService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
  }

     async signUp (authCredentialsDto: AuthCredentialsDto):Promise<void>{
    return this.userRepository.signUp(authCredentialsDto); //userepository declared above
 }
 async signIn(authCredentialsDto:AuthCredentialsDto): Promise<{accessToken: string}> //this was done after determining the return type
   {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto);
    console.log(username);

    if( !username) {// username is falsey..google this
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayloadInterface= {username}; //jwt tokens dont put too sensitive information
   const accessToken = await this.jwtService.sign(payload);

   this.logger.debug(`generated JET token with payload ${JSON.stringify(payload)}`); //7.2 probably not a good idea to log this. see lec 7 folder for resources
   return {accessToken};
   //because we are going to use this token jwt token in quite  afew places, we will create an interface
 }
}
