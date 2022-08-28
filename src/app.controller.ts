import { Controller, DefaultValuePipe, Get, Param, ParseEnumPipe, Query, ValidationPipe } from '@nestjs/common';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { AppService } from './app.service';

enum Language {
  EN = 'EN',
  TR = 'TR'
}

class SayHelloV2QueryParams {
  @IsEnum(Language)
  @IsNotEmpty()
  language: Language = Language.TR;
}

class SayHelloV3Params {
  firstName: string;
  lastName: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // curl --location --request GET 'http://localhost:3000'
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // curl --location --request GET 'http://localhost:3000/sayHelloEnglish/kenan/hancer'
  @Get('/sayHelloEnglish/:firstName/:lastName')
  sayHelloEnglish(@Param('firstName') firstName: string, @Param('lastName') lastName: string): string {
    return this.appService.sayHelloEnglish(firstName, lastName);
  }

  // curl --location --request GET 'http://localhost:3000/sayGoodbyeEnglish/kenan/hancer'
  @Get('/sayGoodbyeEnglish/:firstName/:lastName')
  sayGoodbyeEnglish(@Param('firstName') firstName: string, @Param('lastName') lastName: string): string {
    return this.appService.sayGoodbyeEnglish(firstName, lastName);
  }

  // curl --location --request GET 'http://localhost:3000/sayHelloTurkish/kenan/hancer'
  @Get('/sayHelloTurkish/:firstName/:lastName')
  sayHelloTurkish(@Param('firstName') firstName: string, @Param('lastName') lastName: string): string {
    return this.appService.sayHelloTurkish(firstName, lastName);
  }

  // curl --location --request GET 'http://localhost:3000/sayGoodbyeTurkish/kenan/hancer'
  @Get('/sayGoodbyeTurkish/:firstName/:lastName')
  sayGoodbyeTurkish(@Param('firstName') firstName: string, @Param('lastName') lastName: string): string {
    return this.appService.sayGoodbyeTurkish(firstName, lastName);
  }

  // curl --location --request GET 'http://localhost:3000/sayHellov1/TR/kenan/hancer'
  // curl --location --request GET 'http://localhost:3000/sayHellov1/EN/kenan/hancer'
  @Get('/sayHellov1/:language/:firstName/:lastName')
  sayHelloV1(@Param('language', new ParseEnumPipe(Language)) language: Language, @Param('firstName') firstName: string, @Param('lastName') lastName: string): string {
    switch (language) {
      case Language.TR:
        return this.appService.sayHelloTurkish(firstName, lastName);
      case Language.EN:
        return this.appService.sayHelloEnglish(firstName, lastName);
      default:
        return this.appService.getHello();
    }
  }

  // curl --location --request GET 'http://localhost:3000/sayHellov2/kenan/hancer'
  // curl --location --request GET 'http://localhost:3000/sayHellov2/kenan/hancer?language=EN'
  @Get('/sayHellov2/:firstName/:lastName')
  sayHelloV2(@Query('language', new DefaultValuePipe('TR')) language: Language, @Param('firstName') firstName: string, @Param('lastName') lastName): string {
    return this.sayHelloV1(language, firstName, lastName);
  }

  // curl --location --request GET 'http://localhost:3000/sayHellov3/kenan/hancer'
  // curl --location --request GET 'http://localhost:3000/sayHellov3/kenan/hancer?language=EN'
  @Get('/sayHelloV3/:firstName/:lastName')
  sayHelloV3(@Query(new ValidationPipe({ transform: true })) queryParams: SayHelloV2QueryParams, @Param() params: SayHelloV3Params): string {
    const { language } = queryParams;
    const { firstName, lastName } = params;

    return this.sayHelloV1(language, firstName, lastName);
  }
}
