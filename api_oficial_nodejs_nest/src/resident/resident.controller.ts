import { Controller, Body, Post, InternalServerErrorException } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import bcrypt from 'bcryptjs';

import { ResidentDto, CreateOrUpdateResidentDto } from './dto/resident-dto';
import { ResidentService } from './resident.service';

@Controller('resident')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @Post()
  public async createOrUpdate(
    @Body() args: CreateOrUpdateResidentDto,
  ): Promise<DeepPartial<ResidentDto> | InternalServerErrorException> {
    if (args.password) args.password = await bcrypt.hash(args.password, 10);

    const resident = await this.residentService.createOrUpdate(args);

    if (typeof resident === 'boolean') throw new InternalServerErrorException();

    return resident;
  }
}
