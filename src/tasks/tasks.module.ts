import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import {AuthModule} from '../auth/auth.module'; //anything that the authmodule exports, can be used in the tasks module

@Module({ //dependency injection happening below
  imports:[TypeOrmModule.forFeature([TasksRepository]),AuthModule] , // imports are used for importing modules.. forFeature- in the forFeature square brackets
  // the value we have there is for the repositories we wish to load into the ecosystem. We import here so that we can consume it in the service.
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
