import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
// import { TaskStatus } from '../task';
import { stat } from 'fs';
import { TaskStatus } from '../task-status.enum';

//pipe gets wired to controller
export class TaskStatusValidationPipe implements PipeTransform{ // notice that writing a pipe  implements PipeTransform

  readonly  allowedStatuses= [
     TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
  TaskStatus.DONE , TaskStatus.OPEN
  ]; // new class property..read only means even at runtime it canot be modified by class members

  transform(value: any, metadata: ArgumentMetadata): any { //PipeTransform must have a transform declaration
    // in some cases we may not need metadata so we can remove it. eg transform(value: any)
    // at this point value contains the value of the parameter we received
    // console.log('value',value);
    // console.log('metadata',metadata);

    value = value.toUpperCase()
    if (!this.isStatusValid(value)){
      throw  new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private  isStatusValid (status: any){
    const idx = this.allowedStatuses.indexOf(status); // note that indexof will return -1 if it doesnt exist
    return idx !==-1  ; //will return true or false if the idx =-1
  }

}