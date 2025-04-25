import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task, TaskDocument } from './schemas/task.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('my-tasks')
  findUserTasks(@Request() req): Promise<TaskDocument[]> {
    return this.taskService.findTasksByUserId(req.user.userId);
  }

  @Post()
  createTask(@Request() req, @Body() taskData: Partial<Task>): Promise<TaskDocument> {
    return this.taskService.createTask(req.user.userId, taskData);
  }
}
