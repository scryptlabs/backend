import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from '../inventory/item.repository';
import { Employee } from './employee.entity';
import { AuthModule } from '../auth/auth.module';
import { InventoryController } from '../inventory/inventory.controller';
import { InventoryService } from '../inventory/inventory.service';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeRoleModule } from './employee-role/employee-role.module';
import { RoleModule } from './role/role.module';

@Module({
  imports:[TypeOrmModule.forFeature([Employee]),AuthModule,RoleModule, EmployeeRoleModule] , // imports are used for importing modules.. forFeature- in the forFeature square brackets
  // the value we have there is for the repositories or entities we wish to load into the ecosystem. We import here so that we can consume it in the service.
  controllers: [],
  providers: [EmployeeService,EmployeeResolver],})


export class EmployeeModule {}
