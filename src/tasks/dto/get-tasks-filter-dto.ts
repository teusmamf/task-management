import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TasksStatus } from "../tasks-status.enum";

export class getTasksfilterdto{

        @IsOptional()
        @IsEnum(TasksStatus)
        status?: TasksStatus;

        @IsOptional()
        @IsNotEmpty()
        search?: string;
}