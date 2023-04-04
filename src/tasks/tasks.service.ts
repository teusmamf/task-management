import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskMessages, TasksStatus } from './tasks-status.enum';
import { v4 as uuid } from "uuid";
import { createTaskdto } from './dto/create-task-dto';
import { getTasksfilterdto } from './dto/get-tasks-filter-dto';
import { TasksRepository } from './tasks-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task-entity';
import { title } from 'process';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private TaskRepository : TasksRepository,
    ){

    }
    // getAllTaks() : Task[] {
    //     return this.TasksArray;
    // }

    // createTask(createTaskdto: createTaskdto) : Task{
    //     const {title , description } = createTaskdto ?? {};
    
    //     const task : Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status : TasksStatus.OPEN,
    //     };

    //     this.TasksArray.push(task);
    //     return task;
    // }



   
        async createAtask(createataskDto : createTaskdto ): Promise<Task>{
            const { title , description } = createataskDto;
    
            const task = this.TaskRepository.create({
                title,
                description,
                status:TasksStatus.OPEN,
            })
           
            await this.TaskRepository.save(task);
            return task;
        }
        
        
    
    
    
        
    
    async getTaskbyID(id:string): Promise<Task>{
        const found = await this.TaskRepository.findOne({where : {id}});
        if(!found){
            throw new NotFoundException(`Task with ID:${id} was not found`);
        }

        return found
    }
  
    async deleteTask(id : string):Promise<{message : string}>{
       
        const deleted = await this.TaskRepository.delete(id);
        if(deleted.affected === 0 ){
            throw new NotFoundException('TASK NOT FOUND');
        }else{
            return {message : TaskMessages.TASK_DELETED}
        }
       
    }

    // deleteTask(id: string):{ task : Task , messsage : string}{

    //     const taskToDelete = this.TasksArray.find(task => task.id === id);
    //     if(!taskToDelete){
    //         throw new NotFoundException(TaskMessages.TASK_NOT_FOUND)
    //     }
    //     this.TasksArray = this.TasksArray.filter(task => task.id !== id);
    //     return {messsage : TaskMessages.TASK_DELETED , task : taskToDelete};
    // }


    // updateTask(id : string , status : TasksStatus): Task {
        
    //     const task = this.getAsingletask(id);
    //     task.status = status;

    //     return task;
    // }

    // getTaskswithfilters(filterDto : getTasksfilterdto){
    //     const {status , search} = filterDto;

    //     let tasks = this.getAllTaks();

    //     if(status){
    //         tasks = tasks.filter((task) => task.status === status);
    //     }
    //     if(search){
    //         tasks = tasks.filter((task) => {
    //             if(task.title.includes(search) || task.description.includes(search)){
    //                 return true;
    //             }
    //             return false
    //         });
    //     }

    //     return tasks;
    // }
}
