import { IsInt, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export enum ocurrenceEnum {
  'pertubacao de sossego' = 1,
  'horario limite utrapassado',
  'outros',
}

export class OcurrenceDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsInt()
  idReservation: number;

  @IsEnum(ocurrenceEnum)
  @Transform((description) => ocurrenceEnum[description])
  description: number;
}
