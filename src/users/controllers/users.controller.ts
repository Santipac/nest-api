import { Controller, Delete, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDTO, UserDTO } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('all')
  public async getUsers() {
    return await this.userService.findUsers();
  }
  @Get(':id')
  public async getUser(@Param('id') userId: string) {
    return await this.userService.findUserByID(userId);
  }
  @Post('register')
  public async registerUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body)
  }
  @Put('edit/:id')
  public async updateUser(@Body() body: UpdateUserDTO, @Param('id') id: string) {
    return await this.userService.updateUser(body, id)
  }
  @Delete(':id')
  public async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id)
  }
}
