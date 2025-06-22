import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    // endpoint for register 
    @Post('register')
    register(@Body() userData: CreateUserDto): Promise<User> {
        return this.authService.register(userData);
    }
    // endpoint for login
    @Post('login')
    login(@Body() loginData: LoginUserDto): Promise<User> {
        return this.authService.login(loginData);
    }
}
