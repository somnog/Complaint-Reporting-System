import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';

import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ComplaintsModule } from './modules/complaints/complaints.module';
import { CommentsModule } from './modules/comments/comments.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, CategoriesModule, ComplaintsModule, CommentsModule, AuthModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
