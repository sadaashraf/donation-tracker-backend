import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { RegisterDto, LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async register(dto: RegisterDto) {
    const existing = await this.repo.findOneBy({ phone: dto.phone });
    if (existing) throw new ConflictException('Phone number already registered');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({
      fullName: dto.fullName,
      fatherName: dto.fatherName,
      phone: dto.phone,
      password: hashed,
    });
    const saved = await this.repo.save(user);
    const { password, ...result } = saved;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.repo.findOneBy({ phone: dto.phone });
    if (!user) throw new UnauthorizedException('Invalid phone number or password');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid phone number or password');

    const { password, ...result } = user;
    const payload = { sub: user.id, phone: user.phone, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      // user: result,
    };
  }

  findAll() {
    return this.repo.find({ select: ['id', 'fullName', 'fatherName', 'phone', 'createdAt'] });
  }

  makeAdmin(id: number) {
    return this.repo.update(id, { role: 'admin' });
  }
}
