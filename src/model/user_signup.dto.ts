
import { IsString, IsNotEmpty, isString } from "class-validator";


export class SignupDto{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    username:string

    @IsNotEmpty()
    @IsString()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string

    @IsNotEmpty()
    @IsString()
    role:string

}