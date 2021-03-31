// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TasksModule } from './tasks/tasks.module';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

// @Module({
//   imports: [TypeOrmModule.forRoot(typeOrmConfig), // forRoot = for root module, inside we provide the options object
//     TasksModule, AuthModule],
//   controllers: [TasksController],
//   providers: [TasksService],
//   // controllers: [AppController],
//   // providers: [AppService], //as part of starting project we removed these
// })

import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from './config/typeorm.config';
import { InventoryModule } from './inventory/inventory.module';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeService } from './employee/employee.service';
// import { ModuleService } from './module/module.service';
import { EmployeeModule } from './employee/employee.module';
import { GraphQLModule } from '@nestjs/graphql';
import { RoleModule } from './employee/role/role.module';
import { EmployeeRoleModule } from './employee/employee-role/employee-role.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({autoSchemaFile:true}),
    TasksModule,
    AuthModule,
    InventoryModule,
    EmployeeModule,
    RoleModule,
    EmployeeRoleModule, //add your modules here


  ],

  // controllers: [EmployeeController],
  // providers: [EmployeeService]//, ModuleService],

})

export class AppModule {}
//multiple ways to define the database connection
// 1) in a static json file
// 2) as an object
// 3) providing the data asynchronously as a service
// we are going to use 2), using an object in a seperate file under the config folder.
