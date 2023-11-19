import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, UpdateProjectDTO } from '../dto/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Get('all')
  public async getUsers() {
    return await this.projectsService.findProjects();
  }
  @Get(':id')
  public async getUser(@Param('id') userId: string) {
    return await this.projectsService.findProjectByID(userId);
  }
  @Post('create')
  public async registerUser(@Body() body: ProjectDTO) {
    return await this.projectsService.createProject(body);
  }
  @Put('edit/:id')
  public async updateUser(
    @Body() body: UpdateProjectDTO,
    @Param('id') id: string,
  ) {
    return await this.projectsService.updateProject(body, id);
  }
  @Delete(':id')
  public async deleteUser(@Param('id') id: string) {
    return await this.projectsService.deleteProject(id);
  }
}
