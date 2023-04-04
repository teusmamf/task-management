import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { createTaskdto } from './dto/create-task-dto';
import { getTasksfilterdto } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusdto } from './dto/UpdateTaskStatusdto';
import { Task } from './task-entity';
import { TasksStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('tasks')
export class TasksController {
   
    constructor(private taskService : TasksService){}


/*
    // /* Get--------- methods*/
    // @Get()
    // getTasks(@Query() filterDto : getTasksfilterdto): Task[] {

    //     if(Object.keys(filterDto).length){
            
    //         return this.taskService.getTaskswithfilters(filterDto);

    //     }else{

    //         return this.taskService.getAllTaks();

    //     }

        

    // }

    @Get('/:id')
    getTaskbyID(@Param('id')id: string): Promise<Task> {
        return this.taskService.getTaskbyID(id);
    }

    // @Get('/:id')
    // getasingletask(
    // @Param('id') id : string
    // ): Task {
    //     return this.taskService.getAsingletask(id);
    // }


    // @Post()
    // createAtask(@Body() createataskDto : createTaskdto) : Task {
    //     return this.taskService.createTask(createataskDto);

    // }

    @Post('/create')
    createaTask(@Body() createTaskdto : createTaskdto): Promise<Task> {
        return this.taskService.createAtask(createTaskdto);
    }


    
    
     @Delete('/:id')
     @HttpCode(200)
      async deleteTask(@Param('id') id : string): Promise<{message : string}> {

         const deletedTask = await this.taskService.deleteTask(id);

         return deletedTask;
     }

    // @Patch('/:id/status')
    // updateTask(
    //     @Param('id') id : string,
    //     @Body() UpdateTaskStatusdto: UpdateTaskStatusdto,
    //     ): Task {
    //     const {status } = UpdateTaskStatusdto;
    //     return this.taskService.updateTask(id,status);

    // }

}
