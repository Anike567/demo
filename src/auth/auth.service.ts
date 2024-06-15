import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async authenticate(username: string, userId: object,role) {
    const payload = { sub: userId, username, role};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verify(token: string) {
    try {
      const result = await this.jwtService.verifyAsync(token);
      return result;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
