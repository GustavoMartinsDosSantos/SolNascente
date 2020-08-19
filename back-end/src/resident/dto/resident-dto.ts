import { IsString, MinLength, IsInt, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { Cpf } from '~/cpf/cpf.service';

export enum residentEnum {
  'morador' = 1,
  'subsindico',
  'sindico',
}

export class ResidentDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  @MinLength(4)
  password: string;

  @Transform((cpf: string) => (Cpf.isValid(cpf) ? Cpf.format(cpf) : undefined))
  @IsString()
  cpf: string;

  @IsString()
  telephone: string;

  @IsInt()
  number: number;

  @IsInt()
  block: number;

  @IsEnum(residentEnum)
  @Transform((profile: string) => residentEnum[profile])
  profile: number | string;

  @IsOptional()
  token?: string;
}

export class CreateOrUpdateResidentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @Transform((cpf: string) => (Cpf.isValid(cpf) ? Cpf.format(cpf) : undefined))
  @IsString()
  cpf: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  password?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsInt()
  number?: number;

  @IsOptional()
  @IsInt()
  block?: number;

  @IsEnum(residentEnum)
  @Transform((profile: string) => residentEnum[profile])
  profile: number | string;
}
