import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class roleDTOInput{
  // TODO: add validators
  // role_id:number; not needed
  @Field()
  name: string;
  @Field()
  description:string;
  @Field()
  level:number;

}