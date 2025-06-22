import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    // function to register a new user
    async register(userData: CreateUserDto): Promise<User> {
        // here we will add the cryptage for the password and other logic if needed
        const { password, ...rest } = userData;// hade ster kayfsel l password 3la rest dyal l data
        const saltRounds = 10;// hna l9wa dyal l cryptage li brina (4-31)
        const hashedPassword = await bcrypt.hash(password, saltRounds); // cryptage dyal l password
        // now we will create a new user with the hashed password
        const newUser = {
            ...rest,
            password: hashedPassword,
        };
        return this.usersService.create(newUser);
    }
    // function to login a user
    async login(loginData: LoginUserDto): Promise<User> {
    const { email, password } = loginData;

    // 1. البحث عن المستخدم بالإيميل
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. التحقق من كلمة المرور
    const isPasswordValid = await bcrypt.compare(password, user.password);// kan9arno l password li ja mn l front end m3a l password li kayn f database b bcrypt.compare
    // ida l password ma kaynach f database wla ma kaynch m3a l password li ja mn l front end kireje3  UnauthorizedException
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. إذا كل شيء تمام، نرجع بيانات المستخدم (لاحقًا نضيف توليد توكن JWT)
    return user;
  }
}
