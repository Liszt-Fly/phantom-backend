import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule, PrismaModule],
  providers: [ConfigService, OpenaiService, PrismaService],
  controllers: [OpenaiController],
})
export class OpenaiModule {}
