import { Injectable, Logger } from '@nestjs/common';
import { getConnection } from 'typeorm';

import { SalonReservationDto, CreateSalonReservationDto, ListSalonReservationDto } from './dto/salon-dto';
import { ResidentService } from '~/resident/resident.service';

@Injectable()
export class SalonService {
  private readonly logger = new Logger(SalonService.name);

  constructor(private readonly residentService: ResidentService) {}

  public async create(id: number, data: CreateSalonReservationDto): Promise<SalonReservationDto | boolean> {
    const resident = await this.residentService.findByCpfOrId(id, ['id']);

    if (typeof resident === 'boolean') return resident;

    let reservation = (await getConnection()
      .query(
        `INSERT INTO salon_reservation (id_resident, start_reservation, end_reservation)
         VALUES (${resident.id}, '${data.startReservation}', '${data.endReservation}')`,
      )
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as SalonReservationDto[];

    if (typeof reservation === 'boolean') return reservation;

    reservation = (await getConnection()
      .query(
        `SELECT * FROM salon_reservation
       WHERE id_resident = ${resident.id}
       AND start_reservation = "${data.startReservation}"
       AND end_reservation = "${data.endReservation}"`,
      )
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as SalonReservationDto[];

    if (typeof reservation === 'boolean') return reservation;

    return reservation[0];
  }

  public async getAll(): Promise<ListSalonReservationDto[] | boolean> {
    const items = (await getConnection()
      .query(
        `SELECT salon_reservation.*, residents.name, residents.cpf
        FROM salon_reservation LEFT JOIN residents ON residents.id = salon_reservation.id_resident;`,
      )
      .catch((error) => {
        this.logger.error(error);
        return false;
      })) as ListSalonReservationDto[] | boolean;

    return items;
  }
}
