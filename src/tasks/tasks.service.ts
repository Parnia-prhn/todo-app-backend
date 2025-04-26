import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument, TaskSchema } from './schemas/task.schema';
import { Model, Types } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(
    userId: Types.ObjectId,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      user: userId,
    });
    return createdTask.save();
  }
  async findAll(userId: Types.ObjectId) {
    return this.taskModel.find({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  async findOne(userId: Types.ObjectId, taskId: string) {
    const task = await this.taskModel.findOne({ _id: taskId, user: userId });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
  async update(
    userId: Types.ObjectId,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: taskId, user: userId },
      updateTaskDto,
      { new: true },
    );
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async remove(userId: Types.ObjectId, taskId: string) {
    const task = await this.taskModel.findOneAndDelete({
      _id: taskId,
      user: userId,
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async removeAll(userId: Types.ObjectId) {
    await this.taskModel.deleteMany({ user: userId });
  }
}
