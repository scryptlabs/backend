import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/tasks.entity';
@Entity()
@Unique(['username']) //expects an array of column names that should be unique
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  username:string;

  @Column()
  password:string;

  @Column()
  salt:string;

  // for below task entity  | inverse relation,who owns the task? task.user |
  @OneToMany(type => Task, task => task.user, {eager:true}) // here for param 1 we are sending in the type of class, param 2 is used to say which column is used on the TASK class side
  tasks: Task[]; //one to many , by using this we can establish the tasks that a user can have
  // note eager:true means everytime we fetch a user, we fetch their tasks automatically


  async validatePassword(password:string):Promise<boolean>{
   // see 5.6 for how this decode is happening/explanation
    const hash= await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}