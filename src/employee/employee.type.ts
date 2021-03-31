//this exposes all the fields that are allowed to be picked up by graphQL

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryColumn } from 'typeorm';
import { Role } from './role/role.entity';
import { RoleType } from './role/role.type';

@ObjectType('Employee') //we explicitly set the name here if we want , otherwise defaults to EmployeeType
export class EmployeeType{

  @Field(type => ID) //generally a good idea to explicitly define ID
  staff_id : string; //external exposed ID

//personal details
  @Field()
  first_name :string;
  @Field()
  last_name :string;
  // @Field()
  dob  :string;
  // @Field()
  id_type :string;
  // @Field()
  id_number :string;
  // @Field()
  gender :string;
//contact details
//   @Field()
  email :string;
  // @Field()
  cell_number :string;
  // @Field()
  telephone_number :string;
  // @Field()
  address_line1 :string;
  // @Field()
  address_line2 :string;
  // @Field()
  suburb :string;
  // @Field()
  city :string;
  // @Field()
  province :string; //create LOV
  // @Field()
  zip :string;

//emergency info
//   @Field()
  blood_type :string;  //create LOV
  // @Field()
  medical_aid :string;
  // @Field()
  medical_aid_no :string;
  // @Field()
  kin_relationship :string;
  // @Field()
  kin_full_name :string;
  // @Field()
  kin_cell :string;
  // @Field()
  kin_telephone :string;
  // @Field()
  kin_address_line1 :string;
  // @Field()
  kin_address_line2 :string;

   // @Column("text", {array:true}) a potential bug ?
  @Field(type => [RoleType]) //returns array of type RoleType
  roles: string[];
}