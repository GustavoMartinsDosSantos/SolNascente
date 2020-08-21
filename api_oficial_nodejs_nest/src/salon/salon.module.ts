import { Module } from '@nestjs/common';

import { ResidentModule } from '~/resident/resident.module';

import { SalonService } from './salon.service';
import { SalonController } from './salon.controller';

@Module({
  imports: [ResidentModule],
  providers: [SalonService],
  controllers: [SalonController],
})
export class SalonModule {}
