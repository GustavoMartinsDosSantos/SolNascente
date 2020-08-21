import { IsString, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { Cpf } from '~/cpf/cpf.service';

export class UserDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  name: string;

  @Transform((cpf: string) => (Cpf.isValid(cpf) ? Cpf.format(cpf) : undefined))
  @IsString()
  cpf: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsInt()
  number?: number;

  @IsOptional()
  @IsInt()
  block?: number;

  @IsString()
  profile: string;

  @IsOptional()
  token?: string;
}

export class DeleteUserDto {
  @Transform((cpf: string) => (Cpf.isValid(cpf) ? Cpf.format(cpf) : undefined))
  @IsString()
  cpf: string;
}
