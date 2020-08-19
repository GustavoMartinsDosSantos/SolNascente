import { Module } from '@nestjs/common';

import { EmployeeModule } from '~/employee/employee.module';

import { ResidentService } from './resident.service';
import { ResidentController } from './resident.controller';

@Module({
  imports: [EmployeeModule],
  providers: [ResidentService],
  controllers: [ResidentController],
  exports: [ResidentService],
})
export class ResidentModule {}
