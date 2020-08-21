import { IsString, MinLength, IsInt, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { Cpf } from '~/cpf/cpf.service';

export enum employeeEnum {
  'porteiro' = 1,
  'zelador',
}

export class EmployeeDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @Transform((cpf: string) => (Cpf.isValid(cpf) ? Cpf.format(cpf) : undefined))
  @IsString()
  cpf: string;

  @IsOptional()
  @MinLength(4)
  @IsString()
  password: string;

  @IsNumber()
  salary: number;

  @IsEnum(employeeEnum)
  @Transform((employee: string) => employeeEnum[employee])
  office: number | string;

  @IsOptional()
  token: string;
}

export class LoginEmployeeDto {
  @Transform((cpf: string) => (Cpf.isValid(cpf) ? Cpf.format(cpf) : undefined))
  @IsString()
  cpf: string;

  @MinLength(4)
  @IsString()
  password: string;
}

export class CreateOrUpdateEmployeeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @Transform((cpf: string) => (Cpf.isValid(cpf) ? Cpf.format(cpf) : undefined))
  @IsString()
  cpf: string;

  @IsOptional()
  @MinLength(4)
  @IsString()
  password?: string;

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsEnum(employeeEnum)
  @Transform((employee: string) => employeeEnum[employee])
  office?: number | string;
}
