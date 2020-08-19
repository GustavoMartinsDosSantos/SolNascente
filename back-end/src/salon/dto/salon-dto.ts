import { IsString, IsDateString } from 'class-validator';

export class SalonReservationDto {
  @IsString()
  name: string;

  @IsDateString()
  startReservation: string;

  @IsDateString()
  endReservation: string;
}

export class CreateSalonReservationDto {
  @IsString()
  startReservation: string;

  @IsString()
  endReservation: string;
}

export class ListSalonReservationDto {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsString()
  startReservation: string;

  @IsString()
  endReservation: string;
}
