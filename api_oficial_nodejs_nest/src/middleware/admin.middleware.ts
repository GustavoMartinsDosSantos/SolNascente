import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jsonWebToken from 'jsonwebtoken';

import { ResidentService } from '~/resident/resident.service';

@Injectable()
export class AdminMiddleware {
  private static readonly residentService = new ResidentService();

  private static readonly logger = new Logger(AdminMiddleware.name);

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

      const admin = await this.residentService.findByCpfOrId(decoded.id, ['profile']);

      if (typeof admin !== 'boolean') {
        if (admin?.profile === 1)
          return new UnauthorizedException('O usuário deve ser síndico ou subsíndico');
      }

      if (!admin) return new UnauthorizedException('O Usuario não existe');

      next();
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Erro ao autenticar');
    }
  }
}
