import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection, Model } from 'mongoose';
import { User } from '../model/user.shema';
import { SignupDto } from '../model/user_signup.dto';
import { LoginDto } from '../model/user_login.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly authService: AuthService
    ) { }

    async login(loginDto: LoginDto) {
        const { username, password } = loginDto;
        const user = await this.userModel.findOne({ username }).exec();
        if (user && user.password === password) {
            const token = await this.authService.authenticate(user.username, user._id,user.role);
            return {
                user,
                token,
            };
        }
        return false;
    }

    async create(arg: SignupDto): Promise<User> {
        const { name, username, email, password } = arg;
        const newUser = new this.userModel({ name, username, email, password });
        return newUser.save();
    }


    async validate(token: string) {
        if (token) {
            const tkn = token.split(' ')[1];
            return await this.authService.verify(tkn);
        } else {
            return null;
        }
    }
}
