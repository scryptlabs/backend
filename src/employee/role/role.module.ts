import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employee.entity';
import { AuthModule } from '../../auth/auth.module';
import { EmployeeRoleModule } from '../employee-role/employee-role.module';
import { Role } from './role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Role]),AuthModule],
  providers: [RoleService,RoleResolver],
  exports:[RoleService]
})
export class RoleModule {}
