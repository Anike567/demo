import { Controller, Get,Body,Res, Post } from '@nestjs/common';
import { LoginDto } from '../model/user_login.dto';
import { SignupDto } from '../model/user_signup.dto';
import { UserService } from './user.service';

const users=[]

@Controller('user')


export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("endpoint1")
    endpoint1(){
        return "welcome from endpoint1";
    }

    @Get("endpoint2")
    endpoint2(){
        return "welcome tor end point2"
    }

    @Post("login")
    async login(@Res() res:any, @Body() logindto: LoginDto){

        const user=await this.userService.login(logindto)
        console.log(user);
        if(user){
            users.push(user);
            
            return res.redirect('/endpoint1');
        }
        return "invalid login credentials"
    }
    @Post("signup")
    signup(@Body() sigupdto:SignupDto){
        return  this.userService.create(sigupdto);
    }
}
