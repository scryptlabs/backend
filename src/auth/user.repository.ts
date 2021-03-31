import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

  async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
    const{username,password} = authCredentialsDto;

    const salt = await bcrypt.genSalt(); //because these things take time,, we add an await
//lecture 2.4

    // const exists = this.findOne({username});
    // i

    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password,salt); //note that we will need to store the salt as well, so make changes to user entity
    console.log(user.password);
    //because of the unique column we put on user entity we are using the try catch below
    try {
      await user.save();
    }catch (error) {
      console.log(error.code); //this logs the error code in the console
      if (error.code ==='23505'){
        //note can keep error codes in an enumeration in its own folder
        throw new ConflictException('Username already exists');
      }else{
        throw new InternalServerErrorException();
      }

    }
  }


   async  validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>{
    const {username,password} = authCredentialsDto;
    const user = await this.findOne({username});

    if (user && await user.validatePassword(password )){
      return user.username;
    }else {
      return null;
    }
  }

  private async hashPassword (password:string, salt:string): Promise<string>{
    return bcrypt.hash(password,salt);
  }
}