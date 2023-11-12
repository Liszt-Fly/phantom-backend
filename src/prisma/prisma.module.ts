import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { WordService } from './word.service';

@Module({
  providers: [PrismaService, WordService],
  exports: [WordService],
})
export class PrismaModule {}
