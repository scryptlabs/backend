import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
// import { AuthCredentialsDto } from './dto/auth-credentials.dto';
// import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
// import { User } from './user.entity';
// import { GetUser } from './get-user.decorator';
import { InventoryService } from './inventory.service';
import { CreateItemDto } from './dto/create-item.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Task } from '../tasks/tasks.entity';
import { Supplier_Item } from './supplier_item.entity';

@Controller('item')
export class InventoryController{
  constructor(
    private  inventoryService: InventoryService, //in order to use the service we use dependency injection to inject it in
  ) {
  }
/*
  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto):Promise<void> {
    // console.log(authCredentialsDto);
    return this.inventoryService.signUp(authCredentialsDto);
  }
   */
  //copied from above and changed
  @Post('/newitem')
  createNewItem(@Body(ValidationPipe) createItemDto: CreateItemDto):Promise<void> {
    // console.log(authCredentialsDto);
    console.log('try 1');
    return this.inventoryService.createNewItem(createItemDto);
    // console.log('try 2');
  }

  @Get('/:id')//can either be /: or just id..for clarify we will add /: ..by prefixing it with : we are saying this is going to be picked up in the future
  getTaskbyId(@Param('id',ParseIntPipe) id:number,
              // @GetUser() user:User //added in in 6.4
  ) : Promise<Supplier_Item[]> {// we are using the ParseIntPipe to tell us to parse the id to a number
    return this.inventoryService.getItemById(id);

  }
  @Get('/:itemid')
  getItemById(@Param('id', ParseIntPipe) id:number): Promise<Supplier_Item[]>{ //parse int pipe is used to check if its a number, its a built in validation pipe

    return this.inventoryService.getItemById(id);
  }

  /*
  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
    return this.inventoryService.signIn(authCredentialsDto);
  }

   */
// @Post('/test')
// @UseGuards(AuthGuard())
// test(@Req() req) //@Req pulls in the entire request,not just the body or header etc //to apply jwt guarding, can be done at the controller level or per request, eg
// {
//   console.log(req);
// }
// note for above, quite cumbersome to do for each guarded route. to fix, we create a custom decorator to do that, see get-user-decorator.
//for the change with using our newly created decorator see below:

  /*@Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) //Using getuser from our created user decorator will cause us to only return the user instead of the entire request body, much cleaner
  {
    console.log(user);
  }
*/

}
