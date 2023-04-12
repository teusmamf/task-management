import { IsEnum } from 'class-validator';
import { TasksStatus } from '../tasks-status.enum';

export class UpdateTaskStatusdto {
  @IsEnum(TasksStatus)
  status: TasksStatus;
}
