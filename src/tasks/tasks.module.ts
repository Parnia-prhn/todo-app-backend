import { Module } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './tasks.controller';
import { Task, TaskSchema } from './schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
