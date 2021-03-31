import { EntityRepository, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';


@EntityRepository(Task) // the 'Task' in brackets tells typeorm that this is the repository for tasks entity
export class TasksRepository extends Repository<Task>{

 private logger = new Logger('taskRepository');
  async getTasks(filterDto: GetTasksFilterDto,
                 user: User) //added in in 6.3
    : Promise<Task[]>{
    const {status,search} = filterDto;

    //using query builder to build up a query from the database
    const query = this.createQueryBuilder('task'); //query builder object is based on a task because the class above extends Repository task

    query.where('task.userId = :userId', {userId: user.id}) ;
    // query.where('task.userId2323 = :userId', {userId: user.id}) ;//for 7.2 we made it fail
    if(status){

      query.andWhere('task.status = :status', {status});// note the : status is a variable and {status} is the value for it , can also be done {status: 'OPEN'}, this is not dynamic though so we dont use it
      //note that andWhere is what we use to create a where clause essentially, we use andWhere insstead of just where because andWhere adds on to a previous where, whereas just where overrites all previous
    }

    if(search){

      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`}) ; //what we are doing here is allowing percentage search for the sql query

    }
    try {
      const tasks = await query.getMany();
      return tasks;
    }catch (e) {
      this.logger.error(`Failed to get tasks for user ${user.username}, Filters ${JSON.stringify(filterDto)}`,e.stack); //error produces a stacktrace
      throw new InternalServerErrorException();

    }

  }
  async createTask(createTaskDto: CreateTaskDto,
  user: User,): Promise<Task>{
    const { title, description } = createTaskDto; // syntax to pull out the key pairs that you care about from the object and will be available within current scope

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user; // in 6.2 we did this due to the database relation
    console.log('user test data');
    console.log(task.user)
    await task.save(); // save the new task, note we dont populate ID because the db will do it for us anyway ...this is an async method hence the await and the async in the method declaration
    delete task.user; //6.2 , does not delete from the entity permanently because it is saved above. now it will not return the whole usser entity to the call
    return task; //good practice to return newly created resource when creating api

  }

}