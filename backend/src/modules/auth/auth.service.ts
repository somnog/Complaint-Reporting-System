import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
  address?: string;
}

interface LoginDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(data: RegisterDto) {
  const hash = await bcrypt.hash(data.password, 10);
  const user = await this.prisma.user.create({
    data: { 
      email: data.email,
      password: hash,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      address: data.address,
    },
  });

  // Generate token after creating user
  const token = await this.jwt.signAsync({
    sub: user.id,
    role: user.role,
  });

  // Remove password before returning user info
  const { password, ...result } = user;

  return {
    access_token: token,
    user: result,
  };
}

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new UnauthorizedException('Invalid email/password');

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid email/password');

    const token = await this.jwt.signAsync({
      sub: user.id,
      role: user.role,
    });

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }
}
