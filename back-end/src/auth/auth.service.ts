import { Injectable, Logger } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { getConnection, DeepPartial } from 'typeorm';

import { UserDto } from '~/user/dto/user-dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly jwtService: JwtService) {}

  public async validateUser(cpf: string, password: string): Promise<DeepPartial<UserDto> | null> {
    try {
      const user = (await getConnection()
        .query(
          `SELECT id, name, cpf, password, profile FROM (
            SELECT id, name, cpf, password, profile FROM residents
            UNION
            SELECT id, name, cpf, password, office
            FROM employees
          ) AS A
          WHERE cpf = "${cpf}"
        `,
        )
        .catch((error) => {
          this.logger.error(error);
          return false;
        })) as Promise<DeepPartial<UserDto>[] | boolean>;

      if (typeof user[0] === 'boolean') return null;

      user[0] = JSON.parse(JSON.stringify(user[0]));

      const { password: passwordHash, ...result } = user[0];

      if (await bcrypt.compare(password, passwordHash)) return result;

      return null;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  public async login(id: number): Promise<string> {
    const payload = { id };
    return this.jwtService.sign(payload);
  }
}
