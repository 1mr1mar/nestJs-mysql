import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // ربط كلاس الخدمة بمستودع TypeORM للتعامل مع جدول users
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // جلب جميع المستخدمين
  findAlllll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // جلب مستخدم واحد حسب ID
  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // إنشاء مستخدم جديد
  create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user); // تجهيز الكائن
    return this.userRepository.save(newUser); // حفظه في قاعدة البيانات
  }

  // تحديث مستخدم حسب ID
  async update(id: number, data: Partial<User>): Promise<User> {
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
