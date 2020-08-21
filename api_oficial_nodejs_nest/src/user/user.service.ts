import { Injectable, Logger } from '@nestjs/common';
import { getConnection } from 'typeorm';

import { EmployeeDto } from '~/employee/dto/employee-dto';
import { ResidentDto } from '~/resident/dto/resident-dto';
import { DeleteUserDto } from './dto/user-dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  public async delete(data: DeleteUserDto): Promise<boolean> {
    const residentResult = (await getConnection()
      .query(`DELETE FROM residents WHERE cpf = "${data.cpf}" LIMIT 1;`)
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as any | boolean;

    const employeeResult = (await getConnection()
      .query(`DELETE FROM employees WHERE cpf = "${data.cpf}" LIMIT 1;`)
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as any | boolean;

    if (typeof residentResult !== 'boolean' || typeof employeeResult !== 'boolean') return true;

    return false;
  }

  public async getAll(): Promise<(ResidentDto | EmployeeDto)[] | boolean> {
    const residents = (await getConnection()
      .query(`SELECT id, name, cpf, profile, telephone, number, block FROM residents ORDER BY id ASC;`)
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as [ResidentDto] | boolean;

    const employees = (await getConnection()
      .query(`SELECT id, name, cpf, office FROM employees ORDER BY id ASC;`)
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as [EmployeeDto] | boolean;

    if (typeof residents === 'boolean' && typeof employees === 'boolean') return false;

    const result: (ResidentDto | EmployeeDto)[] = [];

    if (typeof residents !== 'boolean') result.push(...residents);
    if (typeof employees !== 'boolean') result.push(...employees);

    return result;
  }
}
