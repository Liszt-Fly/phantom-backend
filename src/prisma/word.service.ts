import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class WordService {
  constructor(private readonly prismaService: PrismaService) {}
  async addWord(source: word) {
    this.prismaService.word.create({
      data: {
        word: source.word,
        example: source.example,
        image: source.image,
        meaning: source.meaning,
        symbol: source.symbol,
        exampleTranslation: source.exampleTranslation,
      },
    });
  }
  async findWord(word: string) {
    const res = await this.prismaService.word.findUnique({
      where: {
        word,
      },
    });
    return res;
  }
}
