import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDTO, UpdateProjectDTO } from '../dto/project.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
  ) {}
  public async createProject(body: ProjectDTO): Promise<ProjectsEntity> {
    try {
      return await this.projectRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async findProjects(): Promise<ProjectsEntity[]> {
    try {
      const projects = await this.projectRepository.find();
      if(!projects) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontraron proyectos',
        });
      }
      return projects
    } catch (error) {
       throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async findProjectByID(id: string): Promise<ProjectsEntity> {
    try {
      const project = await this.projectRepository
      .createQueryBuilder('project')
      .where({ id })
      .leftJoinAndSelect('project.usersIncludes', 'usersIncludes')
      .leftJoinAndSelect('usersIncludes.user', 'user')
      .getOne();
      if (!project){
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontró el proyecto',
        });
      }
      return project
    } catch (error) {
       throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async updateProject(
    body: UpdateProjectDTO,
    id: string,
  ): Promise<UpdateResult> {
    try {
      const project: UpdateResult = await this.projectRepository.update(
        id,
        body,
      );
      if (project.affected === 0) {
          throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar el proyecto',
        });
      }
      return project;
    } catch (error) {
       throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async deleteProject(id: string): Promise<DeleteResult> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);
      if (project.affected === 0) {
          throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el proyecto',
        });
      }
      return project;
    } catch (error) {
       throw ErrorManager.createSignatureError(error.message);
    }
  }
}
