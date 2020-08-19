import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';

import { ormConfig } from './config/orm.config';

import { AdminMiddleware } from './middleware/admin.middleware';
import { LostAndFoundMiddleware } from './middleware/lost-and-found.middleware';

import { AuthModule } from './auth/auth.module';
import { ResidentModule } from './resident/resident.module';
import { LostAndFoundModule } from './lost-and-found/lost-and-found.module';
import { EmployeeModule } from './employee/employee.module';
import { SalonModule } from './salon/salon.module';
import { OccurrenceModule } from './occurrence/occurrence.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ResidentModule,
    AuthModule,
    LostAndFoundModule,
    EmployeeModule,
    SalonModule,
    OccurrenceModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(async (req: Request, res: Response, next: NextFunction) => {
        await AdminMiddleware.verify(req, res, next);
      })
      .forRoutes('resident', 'employee', 'user/list', 'user/delete');

    consumer
      .apply(async (req: Request, res: Response, next: NextFunction) => {
        await LostAndFoundMiddleware.verify(req, res, next);
      })
      .forRoutes('lost-and-found/create');
  }
}
