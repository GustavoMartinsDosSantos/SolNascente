import { Injectable, Logger } from '@nestjs/common';
import { getConnection } from 'typeorm';

import { OcurrenceDto } from './dto/ocurrence-dto';

@Injectable()
export class OccurrenceService {
  private readonly logger = new Logger(OccurrenceService.name);

  public async create(data: OcurrenceDto): Promise<OcurrenceDto | boolean> {
    const result = (await getConnection()
      .query(
        `INSERT iNTO occurrences (id_reservation, description) VALUES (${data.idReservation}, ${data.description});`,
      )
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as any | boolean;

    if (typeof result === 'boolean') return result;

    const occurrence = (await getConnection()
      .query(
        `SELECT * FROM occurrences WHERE id_reservation = ${data.idReservation}
         AND description = ${data.description} ORDER BY id DESC LIMIT 1;`,
      )
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as OcurrenceDto[] | boolean;

    if (typeof occurrence === 'boolean') return occurrence;

    return occurrence[0];
  }

  public async getAll(): Promise<OcurrenceDto[] | boolean> {
    const items = (await getConnection()
      .query(
        `SELECT occurrences.*, residents.name
        FROM occurrences LEFT JOIN residents ON residents.id = ( SELECT id_resident FROM salon_reservation WHERE id = id_reservation)
        `,
      )
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as OcurrenceDto[] | boolean;

    return items;
  }
}
