import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async authenticate(username: string, userId: object) {
    const payload = { sub: userId, username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
