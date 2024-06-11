import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../model/user.shema';
import { SignupDto } from '../model/user_signup.dto';
import { LoginDto } from '../model/user_login.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async login(loginDto: LoginDto){
    const { username, password } = loginDto;
    const user = await this.userModel.findOne({ username }).exec();
    if (user && user.password === password) {
      return {username,password};
    }
    return false;
  }

  async create(arg: SignupDto): Promise<User> {
    const { name, username, email, password } = arg;
    const newUser = new this.userModel({ name, username, email, password });
    return newUser.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }
}
