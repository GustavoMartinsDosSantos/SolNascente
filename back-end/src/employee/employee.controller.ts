import { Controller, Body, Post, InternalServerErrorException } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import bcrypt from 'bcryptjs';

import { EmployeeDto, CreateOrUpdateEmployeeDto } from './dto/employee-dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  public async createOrUpdate(
    @Body() args: CreateOrUpdateEmployeeDto,
  ): Promise<DeepPartial<EmployeeDto> | InternalServerErrorException> {
    if (args.password) args.password = await bcrypt.hash(args.password, 10);

    const resident = await this.employeeService.createOrUpdate(args);

    if (typeof resident === 'boolean') {
      throw new InternalServerErrorException();
    }

    return resident;
  }
}
