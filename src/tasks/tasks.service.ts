import { Injectable, NotFoundException } from '@nestjs/common';
// import { Task, TaskStatus } from './tasks.model'; removed because we changed to typeorm and no longer need model
// import * as uuid from 'uuid/V1'; // package that automatically creates a unique id
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

  //tells nestjs to install task repository
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository :TasksRepository,
  ) {}
// New latest get tasks method

async  getTasks(filterDto : GetTasksFilterDto,
                user :User ) //added in in 6.3
  : Promise<Task[]>{
    return this.tasksRepository.getTasks(filterDto,user);

  }

//new typeorm getTaskbyId below - this was removed further on due to inefficiencies and the one above introduced
  async getTaskbyId(id:number,
                    user:User
  ): Promise<Task>{ //if it has async in the method body then it is an asynchronous method
    // we are using a return type of PROMISE  above because the documentation suggests that that is the return type
    // const found = await this.tasksRepository.findOne(id); // we use 'find one ' based on the typeorm class repository built in classes/available
    //we put await above because it is asynchronous -- this stops the execution and waits for the async method to finish before continuing

    const found = await this.tasksRepository.findOne({where: {id,userId: user.id}}); //we commented out the above one because our search criteria has become more complex,
    //we are now passing in a object ^ ..we pass the where - basically where clause object, it will translate to where clauses under the hood

    if(!found){
      // throw new NotFoundException();  //nestjs returns certain HTTP error codes via exceptions like so, to throw a custom exception see below
      throw new NotFoundException(`Task with id "${id}" not found `); //note the back quotes
    }
    return found;
  }

  // async createTask(createTaskDto: CreateTaskDto): Promise<Task> { // note the ' :Task 'means the return type // in 6.2 we switched to the below
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> { // note the ' :Task 'means the return type
    //   //below is destructing the dto object

    //note that we will comment out the below because this is data that has to do with the db, therefore we will use the repository
    // we will move it to the repository
    // const { title, description } = createTaskDto; // syntax to pull out the key pairs that you care about from the object and will be available within current scope
    //
    // const task = new Task();
    //  task.title = title;
    //  task.description = description;
    //  task.status = TaskStatus.OPEN;
    //  await task.save(); // save the new task, note we dont populate ID because the db will do it for us anyway ...this is an async method hence the await and the async in the method declaration
    // return task; //good practice to return newly created resource when creating api
    //
    // new repository way returned below
    // return  this.tasksRepository.createTask(createTaskDto); // in  6.2 we switched to the below
      return  this.tasksRepository.createTask(createTaskDto, user);

  }

  async deleteTask(id:number,
                   user:User): Promise<void>{  //note that whilst we arent returning anything hence the void, we do need to wrap it in a Promise
    const result = await this.tasksRepository.delete({id, userId: user.id}); //note that in the getTaskbyId we provided a where, whereas here we did not, this was because we used findOne there and here we use Delete
    console.log(result);

    if (result.affected === 0){ // result.affected because affected is one of the return types
      throw new NotFoundException(`Task with id "${id}" not found `); //note the back quotes
    }
  }
  //6.5 changed
  async updateTaskStatus(id:number,
                         status:TaskStatus,
                         user:User): Promise<Task>{
    const task =await this.getTaskbyId(id,user);
    task.status = status;
    await task.save();

    return  task;

  }

  // below has been commented out because all this was done before we used typeorm
  //
  // private tasks: Task[] = []; // array of tasks of type task (see the tasks.model.ts interface) ..when using typeorm we remove this
  //
  // getAllTasks(): Task[] { // so that the controller can get it because it is private -- also 'Task []' means we are returning of type Task,could be int , string,etc
  //   return this.tasks;
  // }
  //
  // gettaskWIthFilters(filterDto: GetTasksFilterDto):Task []{
  //   const {status, search} = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status){ // if we have a status defined in the filters then we want to ..
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search){
  //     tasks = tasks.filter(task => task.title.includes(search)  || task.description.includes(search) );
  //     //note the includes searches for anything that matches slightly and then returns true
  //   }
  //   return tasks
  // }
  //
  // //below done without using a DTO
  // // createTask(title: string, description:string): Task { // note the ' :Task 'means the return type
  // //   const task: Task = {  //create a new Task
  // //     id: uuid,
  // //     title, //note that we can use just title here instead of title: title as the key name (one passed in above) and the definition type (one in the model)  name is the same
  // //     description,
  // //     status:TaskStatus.OPEN,
  // //   }
  // //   this.tasks.push(task); //inside we pass the newly created task
  // //   return task; //good practice to return newly created resource when creating api
  // // }
  //
  //
  // //Using a DTO we can do it as follows
  // createTask(createTaskDto: CreateTaskDto): Task { // note the ' :Task 'means the return type
  //   //below is destructing the dto object
  //   const { title, description } = createTaskDto; // syntax to pull out the key pairs that you care about from the object and will be available within current scope
  //
  //   const task: Task = {  //create a new Task
  //     id: uuidv1 (),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   }
  //   this.tasks.push(task); //inside we pass the newly created task
  //   return task; //good practice to return newly created resource when creating api
  // }
  //
  // getTaskbyId(id:string): Task{
  //
  //   // return this.tasks.find(task => task.id === id); without error handling
  //   const found = this.tasks.find(task => task.id === id);//with error handling
  //
  //   if(!found){
  //     // throw new NotFoundException();  //nestjs returns certain HTTP error codes via exceptions like so, to throw a custom exception see below
  //     throw new NotFoundException(`Task with id "${id}" not found `); //note the back quotes
  //   }
  //   return found;
  // }
  //
  // deleteTask(id: string):void  { //note return type is void, dont have to have a return type
  //   const found = this.getTaskbyId(id);
  //   this.tasks = this.tasks.filter(task => task.id !==found.id); //for each task in the array, if the tasks return false then that task will be filtered out from the array.
  // }
  //
  // updateTaskStatus(id: string, status: TaskStatus){
  //   const task = this.getTaskbyId(id);
  //   task.status = status;
  //   return task;
  // }
}
