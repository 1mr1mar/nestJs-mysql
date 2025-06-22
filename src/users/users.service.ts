import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    // ربط كلاس الخدمة بمستودع TypeORM للتعامل مع جدول users
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    // جلب جميع المستخدمين
    findAlllll(): Promise<User[]> {
        return this.userRepository.find();
    }

    // جلب مستخدم واحد حسب ID
    findOne(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }
    // جلب مستخدم واحد حسب البريد الإلكتروني
    async findOneByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    // إنشاء مستخدم جديد
    create(user: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(user); // تجهيز الكائن
        return this.userRepository.save(newUser); // حفظه في قاعدة البيانات
    }

    // تحديث مستخدم حسب ID
    async update(id: number, data: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, data); // تنفيذ عملية التحديث
        const updatedUser = await this.findOne(id);
        if (!updatedUser) {
            throw new Error(`User with ID ${id} not found`); // إذا لم يتم العثور على المستخدم
        }
        return updatedUser; // إرجاع المستخدم بعد التحديث
    }

    // حذف مستخدم حسب ID
    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}


// This service handles the business logic for user management.
// had service howa li kanheto fih lcode li kidwi lina m3a database w logic dyalha
// hta join kikon hna