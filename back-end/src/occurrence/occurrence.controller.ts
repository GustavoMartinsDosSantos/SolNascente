import { Controller, Body, Get, Post, UseGuards, InternalServerErrorException } from '@nestjs/common';

import { JwtAuthGuard } from '~/auth/gql-auth.guard';

import { OcurrenceDto } from './dto/ocurrence-dto';
import { OccurrenceService } from './occurrence.service';

@Controller('occurrence')
export class OccurrenceController {
  constructor(private readonly occurrenceService: OccurrenceService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(@Body() args: OcurrenceDto): Promise<OcurrenceDto | InternalServerErrorException> {
    const occurrence = await this.occurrenceService.create(args);

    if (typeof occurrence === 'boolean') throw new InternalServerErrorException();

    return occurrence;
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  public async findAll(): Promise<OcurrenceDto[] | InternalServerErrorException> {
    const items = await this.occurrenceService.getAll();

    if (typeof items === 'boolean') {
      throw new InternalServerErrorException();
    }

    return items;
  }
}
