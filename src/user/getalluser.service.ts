import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../model/user.shema';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class GetUserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly authService: AuthService
  ) {}

  async getUsers(offset: number, limit: number, authHeader: string) {
    if (authHeader) {
      const tkn = authHeader.split(' ')[1];
      console.log(tkn);

      try {
        const authResult = await this.authService.verify(tkn);
        if (authResult) {
          return this.userModel.find().skip(offset).limit(limit).exec();
        } else {
          return { message: "Unauthorized access" };
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        return { message: "Invalid token" };
      }
    }

    return { message: "Forbidden" };
  }
}
