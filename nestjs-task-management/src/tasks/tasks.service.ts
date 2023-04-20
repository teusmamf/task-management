import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskMessages, TasksStatus } from './tasks-status.enum';
import { v4 as uuid } from 'uuid';
import { createTaskdto } from './dto/create-task-dto';
import { getTasksfilterdto } from './dto/get-tasks-filter-dto';
import { TasksRepository } from './tasks-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task-entity';
import { title } from 'process';
import { User } from 'src/auth/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private TaskRepository: TasksRepository,
    
  ) {}

  async getTasks(filterDto: getTasksfilterdto, user : User): Promise<Task[]> {
    const { status, search } = filterDto;

    const Query = this.TaskRepository.createQueryBuilder('task');

    Query.where('task.userId = :userId', { userId: user.id })

    if (status) {
      Query.andWhere('task.status = :status', { status });
    }
    if (search) {
      Query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` }, // os sinais de porcentagem fazem com que na minha busca eu consiga filtrar por valores parecidos com o que eu coloquei
        // como se eu pesquisar por Clean , ele também vai achar Clea , Cle etc..
      );
    }

    const tasks = await Query.getMany();

    return tasks;
  }

  async createTask(createTaskDto: createTaskdto, user: User, ): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TasksStatus.OPEN;
    task.user = user; // associar a tarefa ao usuário correto
    await this.TaskRepository.save(task);
    return task;
  }
  

  async getTaskbyID(id: string): Promise<Task> {
    const found = await this.TaskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID:${id} was not found`);
    }
    return found;
  }

  async deleteTask(id: string): Promise<{ message: string }> {
    const deleted = await this.TaskRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException('TASK NOT FOUND');
    } else {
      return { message: TaskMessages.TASK_DELETED };
    }
  }

  async updateTask(id: string, status: TasksStatus): Promise<Task> {
    const task = await this.getTaskbyID(id);
    task.status = status;
    this.TaskRepository.save(task);
    return task;
  }

}
