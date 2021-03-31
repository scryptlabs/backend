import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432 , //default is 5432
  username: 'postgres',
  password: 'mahomeddm',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.js'], //entities that translate to tables in the database, and are saved in files, we need to tell typeorm which files these are
  // /../ = go one folder back   ** = any folder    * = any file ending with entity.ts
  synchronize: true, // not recommended to be true in a production database
}