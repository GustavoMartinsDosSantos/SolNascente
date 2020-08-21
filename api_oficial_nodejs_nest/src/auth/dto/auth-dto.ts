import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

import { Cpf } from '~/cpf/cpf.service';

export class AuthDto {
  @Transform((cpf: string) => (Cpf.isValid(cpf) ? Cpf.format(cpf) : undefined))
  @IsString()
  cpf: string;

  @IsString()
  password: string;
}
