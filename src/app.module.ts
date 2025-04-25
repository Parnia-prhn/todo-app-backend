import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TaskModule } from './tasks/tasks.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/task-manager'),
    AuthModule,
    UsersModule,
    TaskModule,
  ],
})
export class AppModule {}

// @Module({
//   imports: [AuthModule, UsersModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
