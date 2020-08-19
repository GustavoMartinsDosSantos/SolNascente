import { Controller, Body, Get, Delete, InternalServerErrorException, HttpCode } from '@nestjs/common';

import { UserService } from './user.service';

import { EmployeeDto } from '~/employee/dto/employee-dto';
import { ResidentDto } from '~/resident/dto/resident-dto';
import { DeleteUserDto } from './dto/user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Delete('delete')
  public async delete(@Body() args: DeleteUserDto): Promise<string | InternalServerErrorException> {
    const result = await this.userService.delete(args);

    if (!result) throw new InternalServerErrorException('Does not exists');

    return JSON.stringify({ ok: true });
  }

  @Get('list')
  public async getAll(): Promise<(ResidentDto | EmployeeDto)[] | InternalServerErrorException> {
    const items = await this.userService.getAll();

    if (typeof items === 'boolean') throw new InternalServerErrorException('Internal server error');

    return items;
  }
}
