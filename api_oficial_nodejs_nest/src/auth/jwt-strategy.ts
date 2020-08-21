import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { jwtStrategyConfig } from '~/config/jwt-strategy.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(jwtStrategyConfig);
  }

  validate(payload: { id: number }): number {
    return payload.id;
  }
}
