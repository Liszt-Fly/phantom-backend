import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { OpenaiService } from './openai.service';
import { WordService } from 'src/prisma/word.service';

@Controller('openai')
export class OpenaiController {
  instance: OpenAI;
  constructor(
    private readonly configService: ConfigService,
    private readonly openaiService: OpenaiService,
    private readonly wordService: WordService,
  ) {
    this.instance = new OpenAI({
      apiKey: this.configService.get('OPENAI_KEY'),
    });
  }
  @Get('word')
  async getWord() {
    const word = await this.openaiService.generateWord();
    let result = await this.wordService.findWord(word);
    if (result) return result;
    let wordRes = await this.openaiService.createWordTextInfo(word);
    this.wordService.addWord(wordRes);
    return await this.openaiService.createWordTextInfo(word);
  }
}
