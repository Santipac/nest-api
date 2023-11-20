import { IsNotEmpty, IsString } from "class-validator";
import { AuthBody } from "../interfaces/auth.interfaces";

export class AuthDTO implements AuthBody {
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
}