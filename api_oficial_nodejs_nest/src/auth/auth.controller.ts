import { Controller, Body, Post, UnauthorizedException } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

import { AuthService } from '~/auth/auth.service';

import { AuthDto } from './dto/auth-dto';
import { UserDto } from '~/user/dto/user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async login(@Body() args: AuthDto): Promise<DeepPartial<UserDto> | UnauthorizedException> {
    const user = await this.authService.validateUser(args.cpf, args.password);

    if (!user) throw new UnauthorizedException('Unauthorized');

    user.token = await this.authService.login(user.id);

    return user;
  }
}
