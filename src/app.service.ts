import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject('GREETING_SERVICE') private client: ClientRedis) {}

  async onModuleInit() {
    // Connect your client to the redis server on startup.
    await this.client.connect();
  }

  async getHello() {
    return this.client.send({ cmd: 'greeting' }, 'Progressive Coder');
  }

  async getHelloAsync() {
    const message = await this.client.send(
      { cmd: 'greeting-async' },
      'Progressive Coder',
    );
    return message;
  }

  async publishEvent() {
    this.client.emit('book-created', {
      bookName: 'The Way Of Kings',
      author: 'Brandon Sanderson',
    });
  }
}
