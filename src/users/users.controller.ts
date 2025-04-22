import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParams } from './dto/query-params.dto';
import { IsValidMongoDBId } from './dto/is-valid-objectID.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() {page, take}: QueryParams) {
    return this.usersService.findAll({page, take});
  }

  @Get(':id')
  findOne(@Param() {id}: IsValidMongoDBId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param() {id}: IsValidMongoDBId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() {id}: IsValidMongoDBId) {
    return this.usersService.remove(id);
  }
}
