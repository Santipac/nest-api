import { IsNotEmpty, IsString } from "class-validator";

export class ProjectDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
export type UpdateProjectDTO = Partial<ProjectDTO>