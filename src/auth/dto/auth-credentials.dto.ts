import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class  AuthCredentialsDto{

  //applying validation
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username:string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message: 'Password too weak'}) //regular expression that validatesif password has upper case lower case and special character
  password:string;
}

