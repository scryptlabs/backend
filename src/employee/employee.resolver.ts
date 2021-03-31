import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { EmployeeType } from './employee.type';

import { EmployeeService } from './employee.service';
import { createEmployeeDTO } from './employee-dto.input';
import { AssignRolesToEmployee } from './assign-Roles-To-Employee.input';

import { Employee } from './employee.entity';
import { RoleService } from './role/role.service';

//resolvers are similar to controllers, but when put in the module they are considered providers not controllers
@Resolver(of => EmployeeType) //this says what type of resolver is this ? of employee type
export class EmployeeResolver{

  constructor(
    private  employeeService: EmployeeService,
    private  roleService : RoleService
  ) {  }

  //
  @Query(returns => EmployeeType) //what type does this query return
  employee(@Args('employeeDTO') empDTO: createEmployeeDTO){

    return this.employeeService.getEmployee(empDTO);
  }

  @Mutation(returns => EmployeeType)
  createEmployee(
    @Args('empDTOinput') empDTO: createEmployeeDTO,){
    return this.employeeService.createEmployee(empDTO);
  }

  @Mutation(returns =>  EmployeeType)
  assignRolesToEmployee(@Args('assignRolesToEmployee') assignRolesToEmployee: AssignRolesToEmployee)
  {
    const {employeeId, roleIds} = assignRolesToEmployee;
    return this.employeeService.assignRolesToEmployee(employeeId,roleIds);
  }

  @ResolveField()
  async roles(@Parent() employee: Employee){ //note that we take the parent object which is employee
    return this.roleService.getManyRoles(employee.roles);
  }

}


