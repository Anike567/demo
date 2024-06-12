import { Controller, Get, Post, Headers, Body, Res, HttpStatus, Redirect } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from '../model/user_login.dto';
import { SignupDto } from '../model/user_signup.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get('endpoint1')
  async endpoint1(@Headers('authorization') authHeader: string) {
    const validationResult = await this.userService.validate(authHeader);
    if (validationResult) {
      return 'hello from endpoint1';
    }
    return 'Not logged in, please login first';
  }



  @Post('login')
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    const result = await this.userService.login(loginDto);
    if (result) {
      const { user, token } = result;
      res.setHeader('Authorization', `Bearer ${token.access_token}`);
      return res.status(HttpStatus.OK).json(user);
    }
    return res.status(HttpStatus.UNAUTHORIZED).send('Invalid login credentials');
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.userService.create(signupDto);
  }
}
