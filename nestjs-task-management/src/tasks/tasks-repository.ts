import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task-entity';
import { TasksStatus } from './tasks-status.enum';
import { createTaskdto } from './dto/create-task-dto';
import { getTasksfilterdto } from './dto/get-tasks-filter-dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {}
