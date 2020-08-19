import { Injectable, Logger } from '@nestjs/common';
import { getConnection, DeepPartial } from 'typeorm';

import { ResidentDto, CreateOrUpdateResidentDto, residentEnum } from './dto/resident-dto';

@Injectable()
export class ResidentService {
  private readonly logger = new Logger(ResidentService.name);

  public async findByCpfOrId(
    arg: string | number,
    columns?: string[],
  ): Promise<DeepPartial<ResidentDto> | boolean> {
    let result = (await getConnection()
      .query(
        `SELECT ${columns || columns.length ? columns.join(',') : '*'} FROM residents WHERE ${
          typeof arg === 'string' ? `cpf = "${arg}"` : `id = ${arg}`
        }`,
      )
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as DeepPartial<ResidentDto>[] | boolean;

    if (typeof result === 'boolean' || !result.length) return false;

    if (result[0].profile) {
      result[0].profile = residentEnum[result[0].profile];
    }

    result = JSON.parse(JSON.stringify(result));

    return result[0];
  }

  public async createOrUpdate(data: CreateOrUpdateResidentDto): Promise<DeepPartial<ResidentDto> | boolean> {
    const { name, cpf, password, telephone, number, block, profile } = data;

    let resident = await this.findByCpfOrId(cpf, ['id']);

    if (typeof resident !== 'boolean') {
      resident = await this.update(data);
      return resident;
    }

    const result = (await getConnection()
      .query(
        `INSERT INTO residents (name, cpf, password, telephone, number, block, profile)
       VALUES ("${name}", "${cpf}", "${password}", "${telephone}", ${number}, ${block}, ${profile});`,
      )
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as any | boolean;

    if (typeof result === 'boolean') return result;

    resident = await this.findByCpfOrId(cpf, [
      'id',
      'name',
      'cpf',
      'telephone',
      'number',
      'block',
      'profile',
    ]);

    if (typeof resident === 'boolean') return resident;

    return resident;
  }

  public async update(data: CreateOrUpdateResidentDto): Promise<DeepPartial<ResidentDto> | boolean> {
    const { cpf, ...args } = data;
    const result = await getConnection()
      .query(
        `UPDATE residents SET ${Object.entries(args)
          .map((item) => {
            if (typeof item[1] === 'string') return `${item[0]} = "${item[1]}"`;

            return `${item[0]} = ${item[1]}`;
          })
          .join(', ')} WHERE cpf = "${cpf}";`,
      )
      .catch((error) => {
        this.logger.error(error);
        return false;
      });

    if (typeof result === 'boolean') return result;

    const resident = await this.findByCpfOrId(cpf, [
      'name',
      'cpf',
      'telephone',
      'number',
      'block',
      'profile',
    ]);

    if (typeof resident === 'boolean') return resident;

    return resident;
  }
}
