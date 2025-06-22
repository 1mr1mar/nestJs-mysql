import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAlllll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findOne(+id);
    }

    @Post()
    create(@Body() userData: CreateUserDto): Promise<User> {
        return this.usersService.create(userData);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userData: UpdateUserDto): Promise<User> {
        return this.usersService.update(+id, userData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(+id);
    }
}




// This controller handles HTTP requests for user management.
// judt to take the http req from the front end  that all it have no logiqu no thing just call the functions from the service 