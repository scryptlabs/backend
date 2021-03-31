import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Role')
export class RoleType{ //everything accessible to GraphQL

  @Field(type => ID)
  role_id:string;

  @Field()
  name:string;

  @Field()
  description:string;

  @Field()
  level:number;



}