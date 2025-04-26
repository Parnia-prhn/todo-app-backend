import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TaskModule } from './tasks/tasks.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from './auth/auth.middleware';
import { RequestMethod } from '@nestjs/common';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/task-manager'),
    AuthModule,
    UsersModule,
    TaskModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'tasks', method: RequestMethod.ALL });
  }
}

// @Module({
//   imports: [AuthModule, UsersModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
