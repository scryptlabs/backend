import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger, NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ItemRepository } from './item.repository';
import { InjectRepository } from '@nestjs/typeorm';
// import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from '../auth/jwt-payload.interface';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './item.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Supplier_Item } from './supplier_item.entity';
import { User } from '../auth/user.entity';
import { Task } from '../tasks/tasks.entity';
import { GetTasksFilterDto } from '../tasks/dto/get-tasks-filter.dto';

@Injectable()
export class InventoryService {
  // private logger = new Logger('authService');
  constructor(
    // @InjectRepository(UserRepository)
    // private userRepository: UserRepository,
    // private jwtService: JwtService,
    private itemRepository : ItemRepository,
  ) {
  }

  async createNewItem (createItemDto: CreateItemDto):Promise<void>{

    console.log("terster");
    console.log('terste2r');
    const {name,category,brand,picture,description,quantity} = createItemDto;


    const item = new Item();
    item.name = name
    item.category = category;
    item.brand = brand;
    item.picture = picture;
    item.description = description;
    item.quantity = quantity;
    item.timestamp = new Date().toLocaleString();//new Date().getTime(); //TODO change this to an actual date type
    console.log(`timestamp is: ${item.timestamp}` );
    // return this.userRepository.signUp(createItemDto); //userepository declared above

    try {
      await item.save();
    }catch (error) {
      console.log('error code: ' + error.code + error.description); //this logs the error code in the console
      if (error.code ==='23505'){ //TODO change this error code, look for a better one to use
        //note can keep error codes in an enumeration in its own folder
        throw new ConflictException('Username already exists');
      }else{
        throw new InternalServerErrorException();
      }

    }
  }

  async getItemById(id:number):Promise<Supplier_Item[]>{

    return this.itemRepository.getItemById(id);
  }


  /*
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

   */
}
