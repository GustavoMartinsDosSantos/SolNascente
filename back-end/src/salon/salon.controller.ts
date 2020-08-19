import { Controller, Req, Body, Get, Post, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '~/auth/gql-auth.guard';
import { SalonService } from './salon.service';

import { SalonReservationDto, CreateSalonReservationDto } from './dto/salon-dto';

@Controller('salon')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: Request,
    @Body() args: CreateSalonReservationDto,
  ): Promise<SalonReservationDto | InternalServerErrorException> {
    const id = req.user as number;
    const reservation = await this.salonService.create(id, args);

    if (typeof reservation === 'boolean') {
      throw new InternalServerErrorException();
    }

    return reservation;
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  public async getAll(): Promise<any> {
    const items = await this.salonService.getAll();

    if (typeof items === 'boolean') {
      throw new InternalServerErrorException();
    }

    return items;
  }
}
