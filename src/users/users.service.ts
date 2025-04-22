import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { QueryParams } from './dto/query-params.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private userModel: Model<User>) { }


  async findAll({ page, take }: QueryParams) {
    take = Math.min(take, 30)
    const users = await this.userModel.find().sort({ _id: -1 }).skip((page - 1) * take).limit(page * take)
    const total = await this.userModel.countDocuments()
    return {
      users,
      total,
      page,
      take
    }
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id)
    if(!user) throw new BadRequestException('user not found')
    return user
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
