import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  sayHelloEnglish(firstName: string, lastName: string): string {
    return `Hello ${firstName} ${lastName}`;
  }

  sayGoodbyeEnglish(firstName: string, lastName: string): string {
    return `Goodbye ${firstName} ${lastName}`;
  }

  sayHelloTurkish(firstName: string, lastName: string): string {
    return `Merhaba ${firstName} ${lastName}`;
  }

  sayGoodbyeTurkish(firstName: string, lastName: string): string {
    return `Gule gule ${firstName} ${lastName}`;
  }
}
