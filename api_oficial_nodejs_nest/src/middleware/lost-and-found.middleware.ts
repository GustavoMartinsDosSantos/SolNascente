import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jsonWebToken from 'jsonwebtoken';

import { EmployeeService } from '~/employee/employee.service';

@Injectable()
export class LostAndFoundMiddleware {
  private static readonly EmployeeService = new EmployeeService();

  private static readonly logger = new Logger(LostAndFoundMiddleware.name);

  // eslint-disable-next-line consistent-return
  public static async verify(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | UnauthorizedException> {
    try {
      const token = req.headers.authorization.replace('Bearer', '').trim();
      jsonWebToken.verify(token, String(process.env.JWT_SECRET));
      const decoded = jsonWebToken.decode(token) as { id: number };

      const admin = await this.EmployeeService.findByCpfOrId(decoded.id, ['office']);

      if (typeof admin !== 'boolean') {
        if (admin?.office !== 2) return new UnauthorizedException('O usuário deve ser zelador');
      }

      if (!admin) return new UnauthorizedException('O Usuario não existe');

      next();
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Erro ao autenticar');
    }
  }
}
