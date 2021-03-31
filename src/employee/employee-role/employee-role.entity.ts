import { Column, Entity, ManyToOne } from 'typeorm';
import { Item } from '../../inventory/item.entity';
import { Employee } from '../employee.entity';
import { Role } from '../role/role.entity';

@Entity()
export class EmployeeRole{

  @ManyToOne(type => Role, role => role.role_id, { primary: true })
  role_id:number;
  @ManyToOne(type => Employee, employee => employee.staff_id, { primary: true })
  staff_id:string;

  @Column()
  date_created:string; //TODO change to timestamp
  @Column()
  timestamp:string;  //TODO change to timestamp

}