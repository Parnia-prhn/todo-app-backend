import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true, unique: false })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  priority: string;

  @Prop({ required: true })
  completed: boolean;

  @Prop({ required: false })
  completedAt: Date;

  @Prop({ required: false })
  reminderAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
