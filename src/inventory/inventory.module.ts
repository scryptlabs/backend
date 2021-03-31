import { Module } from '@nestjs/common';
// import { TasksController } from './tasks.controller';
// import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TasksRepository } from './tasks.repository';
import {AuthModule} from '../auth/auth.module';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { TasksRepository } from '../tasks/tasks.repository';
import { Item } from './item.entity';
import { ItemRepository } from './item.repository';
import { Employee } from '../employee/employee.entity'; //anything that the authmodule exports, can be used in the tasks module


@Module({ //dependency injection happening below
  imports:[TypeOrmModule.forFeature([ItemRepository]),AuthModule] , // imports are used for importing modules.. forFeature- in the forFeature square brackets
  // the value we have there is for the repositories or entities we wish to load into the ecosystem. We import here so that we can consume it in the service.
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
