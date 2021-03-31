import { Module } from '@nestjs/common';

import { EmployeeRole } from './employee-role.resolver';
import { EmployeeRoleService } from './employee-role.service';



@Module({
  providers: [EmployeeRoleService, EmployeeRole]
})
export class EmployeeRoleModule {}
