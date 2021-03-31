import { Field, ID, InputType } from '@nestjs/graphql';
import { type } from 'os';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignRolesToEmployee{

  //TODO add validation
  @IsUUID("4",{each:true}) //note that this will cause it to validate all in the array and not just one
  @Field(type => [ID] )
  roleIds : string[];

  @IsUUID() //this will cause it to validate the one
  @Field(type => ID)
  employeeId:string;
}