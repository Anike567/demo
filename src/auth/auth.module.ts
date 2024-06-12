// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your secret key
      signOptions: { expiresIn: '1200s' }, // Customize as needed
    }),
  ],
  providers: [AuthService],
  exports: [AuthService], // Export AuthService to make it available in other modules
})
export class AuthModule {}
