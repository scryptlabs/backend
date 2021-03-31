import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController{
  constructor(
    private  authService: AuthService, //in order to use the service we use dependency injection to inject it in
  ) {
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto):Promise<void> {
    // console.log(authCredentialsDto);
    return this.authService.signUp(authCredentialsDto);
  }
 @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
    return this.authService.signIn(authCredentialsDto);
 }
// @Post('/test')
// @UseGuards(AuthGuard())
// test(@Req() req) //@Req pulls in the entire request,not just the body or header etc //to apply jwt guarding, can be done at the controller level or per request, eg
// {
//   console.log(req);
// }
// note for above, quite cumbersome to do for each guarded route. to fix, we create a custom decorator to do that, see get-user-decorator.
//for the change with using our newly created decorator see below:
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) //Using getuser from our created user decorator will cause us to only return the user instead of the entire request body, much cleaner
  {
    console.log(user);
  }


}
