import { IUser } from 'src/interfaces/user.interface';
import { Column, BaseEntity, Entity } from 'typeorm';

@Entity({name: 'users'})
export class UsersEntity extends BaseEntity implements IUser {
  @Column()
  age: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  role: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
}
