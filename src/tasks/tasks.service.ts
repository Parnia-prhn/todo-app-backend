import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument, TaskSchema } from './schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async findTasksByUserId(userId: string): Promise<TaskDocument[]> {
    return this.taskModel.find({ user: userId }).exec();
  }

  async createTask(
    userId: string,
    taskData: Partial<Task>,
  ): Promise<TaskDocument> {
    const newTask = new this.taskModel({
      ...taskData,
      user: userId,
    });
    return newTask.save();
  }
}
