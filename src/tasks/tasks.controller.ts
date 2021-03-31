// import { Controller, Get } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get, Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
// import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { filter } from 'rxjs/operators';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './tasks.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks') // note that the tasks in brackets means that any thing coming to the tasks path will be handled //by this tasks controller
@UseGuards(AuthGuard()) // guard the entire controller not just a single method
export class TasksController {
  private logger = new Logger('TasksController'); // 7.2 loggers
  constructor(private tasksService: TasksService) {}// inject the tasksService into the taskscontroller - dependency injection
    // see 2.8 video about explanation

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user:User, //added in in 6.3
  ):Promise<Task[]>  //we are getting this info from the '@Query' parameter hence// note that by saying ValidationPipe, we are saying to use validation thatwe set up for that DTO
     {
       this.logger.verbose(`User ${user.username} retrieving all tasks. Fileters: ${JSON.stringify(filterDto)}`); // note because filrerDTo is an object, we need to stringify it
      return this.tasksService.getTasks(filterDto,user);

     }

  //below get was removed in 4.14 due to inefficiencies
// @Get('/:id')//can either be /: or just id..for clarify we will add /: ..by prefixing it with : we are saying this is going to be picked up in the future
//      getTaskbyId(@Param('id',ParseIntPipe) id:number) : Promise<Task> {// we are using the ParseIntPipe to tell us to parse the id to a number
//         return this.tasksService.getTaskbyId(id);
//
//       }

  //below added in in 6.4
  @Get('/:id')//can either be /: or just id..for clarify we  will add /: ..by prefixing it with : we are saying this is going to be picked up in the future
     getTaskbyId(@Param('id',ParseIntPipe) id:number,
                 @GetUser() user:User //added in in 6.4
  ) : Promise<Task> {// we are using the ParseIntPipe to tell us to parse the id to a number
        return this.tasksService.getTaskbyId(id,user);

      }

@Post()
  @UsePipes(ValidationPipe) // this is how we declare a pipe, the validationPipe will automatically apply it to the validation on the DTO
  createTask(@Body() createTaskDto: CreateTaskDto,
             @GetUser() user:User, //uses the getUser one that we created. this gives us the entire user object of the user that sent us this request
): Promise<Task> {
  // createTask(@Body() createTaskDto: CreateTaskDto    ): Promise<Task> { // in lec 6.2 we changed this from the commented out, to the above
      // console.log('title: ',title);
      //   console.log('description: ',description);
      // return this.tasksService.createTask(createTaskDto); //in 6.2 we changed to the below
  this.logger.verbose(`User ${user.username} creating a new task. Data ${JSON.stringify(createTaskDto)}`);//7.2
  return this.tasksService.createTask(createTaskDto,user);
    }

@Delete('/:id')
      descriptioneleteTask(@Param('id',ParseIntPipe) id: number,
                           @GetUser() user:User, ) //added in 6.6
  :Promise<void>{
        return this.tasksService.deleteTask(id,user);
        //note that nest js knows to return http code 200 if nothing is found.
      }

//6.5 changed
@Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id:number,
    @Body('status',TaskStatusValidationPipe) status: TaskStatus, //note we use body because this status will come from the body //note if we supply a second parameter to the body decorator, it will apply it as a pipe
    @GetUser() user: User,
     // note we can supply a new instanceof the pipe with arguments eg. new TaskStatusValidationPipe()
      ) : Promise<Task> {
    return this.tasksService.updateTaskStatus(id,status,user);
      }

// ALl the below has been commented out because it was before we used typeorm and repositories.
  //
  // @Get()
  // // getAllTasks(): Task[]  // when a get request comes in to this path, it knows that this method will handle da stuff -- the Task[] means we are returning a type Task array
  // //   {
  // //     return this.tasksService.getAllTasks();
  // //   }
  //   //below we make the above based on a filter
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] //we are getting this info from the '@Query' parameter hence// note that by saying ValidationPipe, we are saying to use validation thatwe set up for that DTO
  //    {
  //      if (Object.keys(filterDto).length){
  //        return this.tasksService.gettaskWIthFilters(filterDto);
  //      }
  //      else{
  //        return this.tasksService.getAllTasks();
  //      }
  //
  //
  //    }
  //
  //   // @Post()  // 2 ways to receive a response
  //   // 1. We we receive the entire body.
  //   //2. pull specific things from the body
  //   //method 1 below
  //   // createTask(@Body() body){ // this means retrieve the entire request body , we use the @body decorator to say it is a body type
  //   //   console.log('body: ',body);
  //   // }
  //
  //   //method 2 below:
  // // createTask(// pull the specific parameters that we want i.e title:string and decription: string , not @body('title')
  // //   @Body('title')title:string, // @body('title') where title is the exact key from the body tht we want to pull out
  // //   @Body('description') description: string,
  // //   ): Task {
  // //   // console.log('title: ',title);
  // //   //   console.log('description: ',description);
  // //     return this.tasksService.createTask(title,description);
  // //
  // // }
  //
  //   //Now we create the function by using a dto
  // @Post()
  // @UsePipes(ValidationPipe) // this is how we declare a pipe, the validationPipe will automatically apply it to the validation on the DTO
  //   createTask(@Body() createTaskDto: CreateTaskDto    ): Task {
  //     // console.log('title: ',title);
  //     //   console.log('description: ',description);
  //     return this.tasksService.createTask(createTaskDto);
  //   }
  //     @Get('/:id')//can either be /: or just id..for clarify we will add /: ..by prefixing it with : we are saying this is going to be picked up in the future
  //    getTaskbyId(@Param('id') id:string) : Task {// we are telling it to expect a url parameter that is name id
  //       return this.tasksService.getTaskbyId(id);
  //
  //     }
  //
  //     @Delete('/:id')
  //     deleteTask(@Param('id') id: string):void{
  //       this.tasksService.deleteTask(id);
  //       //note that nest js knows to return http code 200 if nothing is found.
  //     }
  //
  //     @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id:string,
  //   @Body('status',TaskStatusValidationPipe) status: TaskStatus, //note we use body because this status will come from the body //note if we supply a second parameter to the body decorator, it will apply it as a pipe
  //    // note we can supply a new instanceof the pipe with arguments eg. new TaskStatusValidationPipe()
  //     ) : Task {
  //   return this.tasksService.updateTaskStatus(id,status);
  //     }

}
