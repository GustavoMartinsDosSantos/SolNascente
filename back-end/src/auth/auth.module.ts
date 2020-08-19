import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfig } from '~/config/jwt.config';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule.register(jwtConfig), PassportModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
