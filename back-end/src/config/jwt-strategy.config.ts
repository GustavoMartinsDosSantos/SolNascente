import { ExtractJwt, StrategyOptions } from 'passport-jwt';

export const jwtStrategyConfig: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: process.env.JWT_SECRET,
};
