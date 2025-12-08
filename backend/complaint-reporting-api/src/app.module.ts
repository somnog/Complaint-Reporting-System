import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [PrismaModule, AuthModule, ComplaintsModule, CategoriesModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
