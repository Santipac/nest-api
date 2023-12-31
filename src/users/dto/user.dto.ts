import { IsNotEmpty, IsString, IsNumber, IsEnum, IsUUID } from "class-validator";
import { ACCESS_LEVEL, ROLES } from "src/constants/roles";
import { UsersEntity } from "../entities/users.entity";
import { ProjectsEntity } from "src/projects/entities/projects.entity";

export class UserDTO {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;


    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES;
}

export type UpdateUserDTO = Partial<UserDTO>

export class UserToProjectDTO {
    @IsNotEmpty()
    @IsUUID()
    user: UsersEntity

    @IsNotEmpty()
    @IsUUID()
    project: ProjectsEntity

    @IsNotEmpty()
    @IsEnum(ACCESS_LEVEL)
    accessLevel: ACCESS_LEVEL
}