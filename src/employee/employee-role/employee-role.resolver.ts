import { Field, Resolver } from '@nestjs/graphql';
import { Column, ManyToOne } from 'typeorm';
import { Role } from '../role/role.entity';
import { Employee } from '../employee.entity';

@Resolver()
export class EmployeeRole {

  @Field()
  @ManyToOne(type => Role, role => role.role_id, { primary: true })
  role_id:number;
  @ManyToOne(type => Employee, employee => employee.staff_id, { primary: true })
  staff_id:string;

  @Field()
  date_created:string; //TODO change to timestamp
  @Field()
  timestamp:string;  //TODO change to timestamp

}
