import { Controller, Body, Get, Post, UseGuards, InternalServerErrorException } from '@nestjs/common';

import { JwtAuthGuard } from '~/auth/gql-auth.guard';

import {
  CreateOrUpdateLostAndFoundDto,
  LostAndFoundDto,
  ListLostAndFoundDto,
} from './dto/lost-and-found-dto';
import { LostAndFoundService } from './lost-and-found.service';

@Controller('lost-and-found')
export class LostAndFoundController {
  constructor(private readonly lostAndFoundService: LostAndFoundService) {}

  @Post('create')
  public async create(
    @Body() args: CreateOrUpdateLostAndFoundDto,
  ): Promise<LostAndFoundDto | InternalServerErrorException> {
    const item = await this.lostAndFoundService.create(args);

    if (typeof item === 'boolean') {
      throw new InternalServerErrorException();
    }

    return item;
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  public async getAll(): Promise<ListLostAndFoundDto[] | InternalServerErrorException> {
    const items = await this.lostAndFoundService.getAll();

    if (typeof items === 'boolean') {
      throw new InternalServerErrorException();
    }

    return items;
  }
}
