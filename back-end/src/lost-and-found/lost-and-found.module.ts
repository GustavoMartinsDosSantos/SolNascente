import { Module } from '@nestjs/common';

import { ResidentModule } from '~/resident/resident.module';

import { LostAndFoundService } from './lost-and-found.service';
import { LostAndFoundController } from './lost-and-found.controller';

@Module({
  providers: [LostAndFoundService],
  controllers: [LostAndFoundController],
  imports: [ResidentModule],
})
export class LostAndFoundModule {}
