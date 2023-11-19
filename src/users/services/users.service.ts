import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDTO, UserDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}
  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async findUsers(): Promise<UsersEntity[]> {
    try {
      const users = await this.userRepository.find()
      if(!users){
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontraron usuarios',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async findUserByID(userId: string): Promise<UsersEntity> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where({ id: userId })
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se pudo encontrar al usuario correspondiente',
        });
      }
      return user
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async updateUser(
    body: UpdateUserDTO,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar el usuario',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el usuario',
        });
      }
      return user;
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message);
    }
  }
}
