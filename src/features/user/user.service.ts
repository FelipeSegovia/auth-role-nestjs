import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: {
        email,
      },
      include: { model: Role, through: { attributes: [] } },
    });

    console.log('User:', user);

    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);

    return user;
  }

  async create(user: CreateUserDto) {
    try {
      await this.userModel.create({
        ...user,
      });

      return 'User created successfully!';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
