import { Injectable, Logger } from '@nestjs/common';
import { getConnection, DeepPartial } from 'typeorm';

import { EmployeeDto, employeeEnum, CreateOrUpdateEmployeeDto } from './dto/employee-dto';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);

  public async findByCpfOrId(
    arg: string | number,
    columns?: string[],
  ): Promise<DeepPartial<EmployeeDto> | boolean> {
    const result = (await getConnection()
      .query(
        `SELECT ${columns || columns.length ? columns.join(',') : '*'} FROM employees WHERE ${
          typeof arg === 'string' ? `cpf = "${arg}"` : `id = ${arg}`
        }`,
      )
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as DeepPartial<EmployeeDto>[] | boolean;

    if (typeof result === 'boolean' || !result.length) return false;

    if (result[0].office) {
      result[0].office = employeeEnum[result[0].office];
    }

    return result[0];
  }

  public async createOrUpdate(data: CreateOrUpdateEmployeeDto): Promise<DeepPartial<EmployeeDto> | boolean> {
    const { name, cpf, password, salary, office } = data;

    let employee = await this.findByCpfOrId(cpf, ['id']);

    if (typeof employee !== 'boolean') {
      employee = await this.update(data);
      return employee;
    }

    const result = (await getConnection()
      .query(
        `INSERT INTO employees (name, cpf, password, salary, office)
       VALUES ("${name}", "${cpf}", "${password}", ${salary}, ${office});`,
      )
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as any | boolean;

    if (typeof result === 'boolean') return result;

    employee = await this.findByCpfOrId(cpf, ['id', 'name', 'cpf', 'salary', 'office']);

    if (typeof employee === 'boolean') return employee;

    return employee;
  }

  public async update(data: CreateOrUpdateEmployeeDto): Promise<DeepPartial<EmployeeDto> | boolean> {
    const result = (await getConnection()
      .query(
        `UPDATE employees SET ${Object.entries(data)
          .map((item) => {
            if (typeof item[1] === 'string') return `${item[0]} = "${item[1]}"`;

            return `${item[0]} = ${item[1]}`;
          })
          .join(', ')} WHERE cpf = "${data.cpf}";`,
      )
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as any | boolean;

    if (typeof result === 'boolean') return result;

    const employee = await this.findByCpfOrId(data.cpf, ['id', 'name', 'cpf', 'salary', 'office']);

    if (typeof employee === 'boolean') return employee;

    return employee;
  }
}
