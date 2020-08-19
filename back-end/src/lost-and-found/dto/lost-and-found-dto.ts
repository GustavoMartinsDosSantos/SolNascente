import { IsInt, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { Cpf } from '~/cpf/cpf.service';

export class LostAndFoundDto {
  @IsInt()
  idInputPerson: number;

  @IsOptional()
  @IsInt()
  idWithdrawalPerson: number;

  @IsString()
  local: string;

  @IsString()
  description: string;
}

export class CreateOrUpdateLostAndFoundDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @Transform((cpf: string) => (Cpf.isValid(cpf) ? Cpf.format(cpf) : undefined))
  @IsString()
  cpf: string;

  @IsOptional()
  @IsString()
  local?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class ListLostAndFoundDto {
  @IsString()
  local: string;

  @IsString()
  description: string;

  @IsString()
  name: string;
}
