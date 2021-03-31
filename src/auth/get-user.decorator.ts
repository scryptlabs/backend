import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

//accepts data (data provided to decorator) and req which contains the request object
// see5.11
// export const GetUser = createParamDecorator((data, req): User => {    //note :User is the type er are returning
//  return req.user;   //return is the parameter that is decorated with this decorator
// });
// the above may not work in NestJS 7 and above, so we use below
export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});