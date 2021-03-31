//this is our task entity - table

import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
// import { TaskStatus } from './tasks.model'; // removed because we using the new taskstatus above

@Entity() //we use the entity decorator to mark it as an entity
export class Task extends BaseEntity{

  @PrimaryGeneratedColumn() //this tells typeorm to auto gen a number and make this  a PK
  id:number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(type => User, user => user.tasks, {eager: false})  //see lecture 6.1. when eager is true, whenever we retrieve the user as an objkect, we can obtain  user.tasks immediately and can an array of tasks owned by the user, only one side of the entity can be eager at any time
  user:User;

  @Column() //added in in 6.3 , the reason we added it in is even though typeOrm creates in in the DB, it will be a stranger to the program and postgres
  userId: number;

}