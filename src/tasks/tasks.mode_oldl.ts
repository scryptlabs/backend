// because we are now using typeorm we will not use the below, the enum has been moved to task-status.enum.ts
//file was originally called tasks.model.ts .... normally we will remove the entire file but for our reference sake we will just rename it.
export interface Task {
  id: string;
  title:string;
  description:string;
  status: TaskStatus;
}

export enum TaskStatus
{
  OPEN='OPEN',
  IN_PROGRESS ='IN_PROGRESS',
  DONE='DONE',

}