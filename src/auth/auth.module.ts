import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule], // kandir had UsersModule 7it AuthService kayn fih llogic dyal login w register also hit kihtag yt3amel m3a data d users w usersModule how li kaydir adxi
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
