import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/common/types/request-with-user';
import { Types } from 'mongoose';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: RequestWithUser) {
    const userId = new Types.ObjectId(req.user.userId);
    return this.taskService.create(userId, createTaskDto);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    const userId = new Types.ObjectId(req.user.userId);
    return this.taskService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = new Types.ObjectId(req.user.userId);
    return this.taskService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = new Types.ObjectId(req.user.userId);
    return this.taskService.update(userId, id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = new Types.ObjectId(req.user.userId);
    return this.taskService.remove(userId, id);
  }
  @Delete()
  removeAll(@Req() req: RequestWithUser) {
    const userId = new Types.ObjectId(req.user.userId);
    return this.taskService.removeAll(userId);
  }
}
