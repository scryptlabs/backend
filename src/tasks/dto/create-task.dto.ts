import {IsNotEmpty} from 'class-validator';

export class CreateTaskDto { //creating  a class
  @IsNotEmpty() // validation decorator
  title:string;

  @IsNotEmpty()
  description: string;
}
