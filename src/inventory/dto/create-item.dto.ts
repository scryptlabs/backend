
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';



export class CreateItemDto { //creating  a class

  // @IsNotEmpty() // validation decorator
  @IsString()
  name:string;

  // @IsNotEmpty()
  @IsString()
  category: string;

  // @IsNotEmpty()
  @IsString()
  brand:string;

  picture:string;
  description:string;

  @IsNumber()
  @Type(() => Number) // installed npm i class-transformer -S
  @IsPositive()
  quantity: number; //quantity on hand workshop
}