import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule, // Import AuthModule which provides JwtAuthGuard and JwtService
  ],
  controllers: [ReviewsController],
  providers: [
    ReviewsService,
  ],
})
export class ReviewsModule {}