import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsString,
} from 'class-validator';

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @IsDateString()
  completedAt?: Date;

  @IsOptional()
  @IsDateString()
  reminderAt?: Date;
}
