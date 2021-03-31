import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { createEmployeeDTO } from './employee-dto.input';
import { IsNotEmpty, IsString } from 'class-validator';
import { Field } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';
import { Role } from './role/role.entity';



@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    //@InjectRepository(Role) private roleRepository: Repository<Role>

  ) {  }

  async getEmployee(empDTO: createEmployeeDTO):Promise<Employee>{

    const {staff_id} = empDTO;

    return this.employeeRepository.findOne(staff_id);

  }
  async createEmployee(emptDTO: createEmployeeDTO) : Promise<Employee>{
    const {first_name, last_name,roles } = emptDTO;
    const emp = this.employeeRepository.create({
        staff_id :uuid(), //external exposed ID
        first_name ,
        last_name ,
        //arbitary values below for now
        dob:"t",  id_number :"t",
        id_doc:"t",
        gender :"t",
        email :"t",
        cell_:"t",
        telephone_:"t",
        address_line1 :"t",
        address_line2 :"t",
        suburb :"t",
        city :"t",
        province :"t",
        zip :"t",
        blood_type :"t",
        medical_aid :"t",
        medical_aid_no :"t",
        kin_relationship :"t",
        kin_full_name :"t",
        kin_cell :"t",
        kin_telephone :"t",
        kin_address_line1 :"t",
        kin_address_line2 :"t",
      roles
      }
    );
    return this.employeeRepository.save(emp);
  }
  async assignRolesToEmployee(empId: string, roleIds: string[]) : Promise<Employee>{
    const employee = await this.employeeRepository.findOne({staff_id :empId});
    employee.roles = [...employee.roles,...roleIds]; //this says that we must add the new roles onto the existing roles
    return this.employeeRepository.save(employee);
  }
}
