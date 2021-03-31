import { Column, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';


@InputType() // input type is a graphQL thing
export class createEmployeeDTO{

  // @IsString()
  // @IsNotEmpty()
  //  @Field()
   staff_id :string; //external exposed ID - removed   because we dont need to take it in as an input
//personal details
  @IsString()
  @IsNotEmpty()
  @Field()
  first_name :string;

  @IsString()
  @IsNotEmpty()
  @Field()
  last_name :string;
  //@IsString()()
  //@IsNotEmpty()
  // @Field()
  dob  :string;
  //@IsString()()
  //@IsNotEmpty()
  // @Field()
  id_type :string;
  //@IsString()()
  //@IsNotEmpty()
  // @Field()
  id_number:string;
  //@IsString()()
  //@IsNotEmpty()
  // @Field()
  gender :string;
//contact details
  //@IsString()()
  email :string;
  //@IsString()()
  //@IsNotEmpty()
  // @Field()
  cell:string;
  //@IsString()()
  //@IsNotEmpty()
  // @Field()
  telephone_:string;
  //@IsString()()
  //@IsNotEmpty()
  // @Field()
  address_line1 :string;
  //@IsString()()
  address_line2 :string;
  //@IsString()()
  //@IsNotEmpty()
  // @Field()
  suburb :string;
  //@IsString()()
  //@IsNotEmpty()
  // @Field()
  city :string;
  //@IsString()()
  //@IsNotEmpty()
  // @Field()
  province :string; //create LOV
  //@IsString()()
  //@IsNotEmpty()
  // @Field()
  zip :string;

//emergency info
  //@IsString()()
  blood_type :string;  //create LOV
  //@IsString()()
  medical_aid :string;
  //@IsString()()
  medical_aid_no :string;
  //@IsString()()
  kin_relationship :string;
  //@IsString()()
  kin_full_name :string;
  //@IsString()()
  kin_cell :string;
  //@IsString()()
  kin_telephone :string;
  //@IsString()()
  kin_address_line1 :string;
  //@IsString()()
  kin_address_line2 :string;

  @IsUUID("4", {each:true})
  @Field(() => [ID], {defaultValue: []}) //return type of ID array, default empty
  roles: string[];
}