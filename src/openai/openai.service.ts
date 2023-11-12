import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { writeFile } from 'fs/promises';
import OpenAI from 'openai';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class OpenaiService {
  instance: OpenAI;
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    this.instance = new OpenAI({
      apiKey: this.configService.get('OPENAI_KEY'),
    });
  }
  async createWordTextInfo(word: string) {
    const data = await this.instance.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          content: `请给我${word}的含义解释,含义解释使用中文,例句使用英文,例句含义使用中文,还有单词的音标信息,音标最好都使用英式音标,使用json格式返回,json的名称分别是word,meaning,example,exampleTranslation,symbol`,
          role: 'system',
        },
      ],
    });
    const jsonContent = data.choices[0].message.content;
    const jsonObject: Pick<
      word,
      'example' | 'meaning' | 'word' | 'exampleTranslation' | 'symbol'
    > = JSON.parse(jsonContent);
    const result: word = Object.assign({}, jsonObject, {
      image: await this.createWordImage(jsonObject.word),
    });
    await this.createAudio(result.word, result.example);
    return result;
  }
  async createWordImage(word: string) {
    const image = await this.instance.images.generate({
      prompt: `这是一个单词app,我需要一个单词配图,单词内容为${word},风格为卡通风格`,
      model: 'dall-e-3',
      quality: 'standard',
    });
    return image.data[0].url;
  }
  async createAudio(content: string, sentence: string) {
    const audio = await this.instance.audio.speech.create({
      input: content,
      model: 'tts-1',
      voice: 'alloy',
    });
    let result = await Promise.all([
      this.instance.audio.speech.create({
        input: content,
        model: 'tts-1',
        voice: 'alloy',
      }),
      this.instance.audio.speech.create({
        input: sentence,
        model: 'tts-1',
        voice: 'alloy',
      }),
    ]);
    let [word, exampSentence] = result;
    let wordBuffer = await word.arrayBuffer();
    let exampleSentenceBuffer = await exampSentence.arrayBuffer();
    writeFile(
      `./audio/${content}_sentence.mp3`,
      Buffer.from(exampleSentenceBuffer),
    );
    writeFile(`./audio/${content}.mp3`, Buffer.from(wordBuffer));
  }
  storeInDB(source: word) {
    this.prismaService.word.create({
      data: {
        word: source.word,
        example: source.example,
        exampleTranslation: source.exampleTranslation,
        symbol: source.symbol,
        image: source.image,
        meaning: source.meaning,
      },
    });
  }
  async generateWord() {
    const data = await this.instance.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          content:
            '请给我随便返回一个单词,要求单词不是非常生僻的单词,但是也不是那种小学的过于简单的单词,单词本身是英文',
          role: 'system',
        },
      ],
    });
    return data.choices[0].message.content;
  }
}
