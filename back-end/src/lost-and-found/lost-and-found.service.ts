import { Injectable, Logger } from '@nestjs/common';
import { getConnection } from 'typeorm';

import {
  LostAndFoundDto,
  CreateOrUpdateLostAndFoundDto,
  ListLostAndFoundDto,
} from './dto/lost-and-found-dto';
import { ResidentService } from '~/resident/resident.service';

@Injectable()
export class LostAndFoundService {
  private readonly logger = new Logger(LostAndFoundService.name);

  constructor(private readonly residentService: ResidentService) {}

  public async createOrUpdate(data: CreateOrUpdateLostAndFoundDto): Promise<LostAndFoundDto | boolean> {
    if (data.id) {
      let item = await this.findById(data.id);

      if (typeof item === 'boolean') return item;

      item = await this.update(data);

      return item;
    }

    const { cpf, description, local } = data;

    const idInputPerson = await this.residentService.findByCpfOrId(cpf, ['id']);

    if (typeof idInputPerson !== 'boolean') {
      const result = await getConnection()
        .query(
          `INSERT INTO lost_and_found (id_input_person, description, local) VALUES (${idInputPerson.id}, "${description}", "${local}")`,
        )
        .catch((error) => {
          this.logger.error(error);
          return false;
        }) as any | boolean;

      if (typeof result === 'boolean') return result;

      const item = (await getConnection()
        .query(
          `SELECT * FROM lost_and_found WHERE id_input_person = ${idInputPerson.id} AND description = "${description}" AND local = "${local}" AND id_withdrawal_person IS NULL`,
        )
        .catch((error) => {
          this.logger.error(error);
          return false;
        })) as LostAndFoundDto[] | boolean;

      if (typeof item === 'boolean') return result;

      return item[0];
    }

    return false;
  }

  public async update(data: CreateOrUpdateLostAndFoundDto): Promise<boolean | LostAndFoundDto> {
    const idWithdrawalPerson = await this.residentService.findByCpfOrId(data.cpf, ['id']);

    if (typeof idWithdrawalPerson !== 'boolean') {
      const result = await getConnection()
        .query(
          `UPDATE lost_and_found SET id_withdrawal_person = ${idWithdrawalPerson.id} WHERE id = ${data.id}`,
        )
        .catch((error) => {
          this.logger.error(error);
          return false;
        }) as any | boolean;

      if (typeof result === 'boolean') return result;

      const item = (await getConnection()
        .query(`SELECT * FROM lost_and_found WHERE id = ${data.id}`)
        .catch((error) => {
          this.logger.error(error);
          return false;
        })) as LostAndFoundDto[] | boolean;

      if (typeof item === 'boolean') return result;

      return item[0];
    }

    return false;
  }

  public async findById(id: number): Promise<LostAndFoundDto | boolean> {
    let item = (await getConnection()
      .query(`SELECT * FROM lost_and_found WHERE id = ${id}`)
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as LostAndFoundDto[] | boolean;

    if (typeof item === 'boolean') return item;

    return item[0];
  }

  public async getAll(): Promise<ListLostAndFoundDto[] | boolean> {
    const items = (await getConnection()
      .query(
        `SELECT lost_and_found.*, residents.name
          FROM lost_and_found LEFT JOIN residents ON residents.id = lost_and_found.id_input_person
           WHERE id_withdrawal_person IS NULL;`,
      )
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as ListLostAndFoundDto[] | boolean;

    return items;
  }
}
