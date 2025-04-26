import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  priority: string;

  @Prop({ required: true })
  completed: boolean;

  @Prop()
  completedAt: Date;

  @Prop()
  reminderAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
